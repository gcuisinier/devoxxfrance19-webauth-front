

import { Component, OnInit } from '@angular/core';
import { WebauthNService } from '../webauth-n.service';
import {WebAuthnApp} from "webauthn-simple-app"


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  host: {
    class:'col mx-auto'
}
})
export class AuthenticationComponent implements OnInit {

  username : String = ""

  isWebAuthNSupported : boolean
  webauthn:WebauthNService;
  

  constructor(webauthn: WebauthNService) { 
    this.webauthn = webauthn
  }

  ngOnInit() {
    this.isWebAuthNSupported = this.webauthn.isSupported()
  }

  async login(){

   

    //alert("username : " + this.username + " " + this.isWebAuthNSupported);

    this.webauthn.login(this.username);
  
  }



}
