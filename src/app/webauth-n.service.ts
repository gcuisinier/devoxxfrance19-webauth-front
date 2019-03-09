/// <reference types="webappsec-credential-management" />


import { Injectable } from '@angular/core';
import {base64url} from "rfc4648";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../environments/environment"

@Injectable({
  providedIn: 'root'
})



export class WebauthNService {



  constructor(private httpClient: HttpClient) {}


  supported : boolean;


  public register(username:String, email:String, firstName:String, lastname:String):void{
    this.httpClient.get<PublicKeyCredentialCreationOptions>(environment.backend_baseurl + "/auth/register?username="  + username )
      .toPromise().then(
        serverResponse => {  
          return{
            rp:  {id : serverResponse.rp.id, name: serverResponse.rp.name},
            user: { id :  base64url.parse(serverResponse.user.id,{ loose: true }), name:"Gildas Cuisinier", displayName: "Gildas Cuisinier"},
            challenge:     base64url.parse(serverResponse.challenge,{ loose: false }) ,
            pubKeyCredParams: serverResponse.pubKeyCredParams,
            timeout: serverResponse.timeout,
          };

         }
      )
      .then(
        serverOption => { 
          let credentialCreationOptions:CredentialCreationOptions = {
            publicKey: serverOption
          };
           return navigator.credentials.create(credentialCreationOptions)
         
        }
      )
      .then( cred => {

        if(cred.type != "public-key"){
          Promise.reject("Unexpected credential type");
        }
        let publicKeyCredential: PublicKeyCredential = cred as PublicKeyCredential;
        let attestationResponse: AuthenticatorAttestationResponse = publicKeyCredential.response as AuthenticatorAttestationResponse;

          let data:any = {
            id: publicKeyCredential.id,
            rawId: base64url.stringify(new Uint8Array(publicKeyCredential.rawId)),
            attestation: base64url.stringify(new Uint8Array(attestationResponse.attestationObject)),
            clientData: base64url.stringify(new Uint8Array(attestationResponse.clientDataJSON)) 
          }

          return this.httpClient.post(environment.backend_baseurl +"/auth/register", data).toPromise()
            .then(response => alert("Bievenue à Devoxx France, " + username + ", \nclé utilisée : " +  (<any>response).usedKey)  )
            .catch(err => console.error(err))



      } )
      .catch(err => console.error(err));
    
  }

  public login(username:String):void{
    this.httpClient.get<PublicKeyCredentialRequestOptions>(environment.backend_baseurl + "/auth/login?username=" + username)
      .toPromise().then(
        serverResponse => {  
          let result = serverResponse.allowCredentials.map(item => {let idString = <string><any> item.id;
            item.id =  base64url.parse(idString,{ loose: true });
            return item})
          return{     
            rpId : serverResponse.rpId,
            challenge:     base64url.parse(serverResponse.challenge,{ loose: false }) ,
            timeout: serverResponse.timeout,
            allowCredentials: result
          };

         }
      )
      .then(serverOptions => {
        let getOption:CredentialRequestOptions = { publicKey:serverOptions };
         let result =  navigator.credentials.get(getOption);
         return result;
        
      }
        ).then( 
          cred => {

            if(cred.type != "public-key"){
              Promise.reject("Unexpected credential type");
            }
            let publicKeyCredential: PublicKeyCredential = cred as PublicKeyCredential;
            let AuthenticatorAssertionResponse: AuthenticatorAssertionResponse = publicKeyCredential.response as AuthenticatorAssertionResponse;
    
              let data:any = {
                id: publicKeyCredential.id,
                rawId: base64url.stringify(new Uint8Array(publicKeyCredential.rawId)),
                response: {
                  authenticatorData : base64url.stringify(new Uint8Array(AuthenticatorAssertionResponse.authenticatorData)),
                  signature : base64url.stringify(new Uint8Array(AuthenticatorAssertionResponse.signature)),
                  userHandle : base64url.stringify(new Uint8Array(AuthenticatorAssertionResponse.userHandle)),
                  clientDataJSON : base64url.stringify(new Uint8Array(AuthenticatorAssertionResponse.clientDataJSON))

                },
                username:username 
              }
    
              return this.httpClient.post(environment.backend_baseurl +"/auth/login", data)
                
                
          } 
        )
        .then(response => {alert("Bonjour, " + username + " tu es bien connecté !"); return response })
        .catch(err => {
          if(err instanceof HttpErrorResponse){
            let httpError:HttpErrorResponse = <HttpErrorResponse> err;
            if(httpError.status == 404){
              alert("L'utilisateur " + username + "n'existe pas");
            } else {
              alert("Une erreur est survenue " + err.message)
            }
          }
          console.error(err);
        })
  }

  
  
  public isSupported() : boolean
    {



        if (this.supported === undefined) {
            this.supported = typeof window['PublicKeyCredential'] !== 'undefined';
        }
        return this.supported;
    }
}
