import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  emailSent: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.emailSent = false;
  }

  resetPassword() {
    this.authService.resetPassword().then(() => (this.emailSent = true));
  }

  get emailAddress(): string {
    return this.authService.currentUserEmailAddress;
  }
}
