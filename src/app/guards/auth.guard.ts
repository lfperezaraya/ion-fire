import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Promise<boolean> {
      const uid = await this.auth.uid();
      const isLoggedIn = !!uid;

      if (!isLoggedIn) {
        const alert = await this.alertCtrl.create({
          header: 'Blocked',
          subHeader: 'Users only',
          message: `You can't access to this feature. Sign up for a premium subscription!`,
          buttons: ['OK']
        });

        await alert.present();
      }

      return isLoggedIn;
  }
}
