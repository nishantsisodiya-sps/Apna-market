import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/service/users-service.service';
import { signUp } from '../products/interface/data';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  showLogin=false;
  authError:String='';
  constructor(private user :UsersServiceService) { }

  ngOnInit(): void {}
}
