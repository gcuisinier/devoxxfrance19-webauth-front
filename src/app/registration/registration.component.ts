import { Component, OnInit } from '@angular/core';
import { WebauthNService } from '../webauth-n.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  host: {
    class:'col mx-auto'
}
})
export class RegistrationComponent implements OnInit {

  username : String = ""

  isWebAuthNSupported : boolean
  webauthn:WebauthNService;
  

  constructor(webauthn: WebauthNService) { 
    this.webauthn = webauthn
  }

  ngOnInit() {
    this.isWebAuthNSupported = this.webauthn.isSupported()
  }

  async register(username:String){

   
  
    //alert("username : " + this.username + " " + this.isWebAuthNSupported);

    this.webauthn.register(username, "", "","");
  
  }

}
