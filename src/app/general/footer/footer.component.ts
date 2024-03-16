import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RedeemgiftComponent } from '../../myaccount/redeemgift/redeemgift.component';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../modal/modal.component';
import { SubscriptionComponent } from 'src/app/common/subscription/subscription.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test : string = 'absolute';
  hideFooter: boolean = true;
  constructor(private common : CommonService,
    public matDialog: MatDialog, 
    ) { }

  ngOnInit(): void {
    if (window.location.href.split('/')[2] == 'gh.avvatta.com' || window.location.href.split('/')[2] == 'ng.avvatta.com' || window.location.href.split('/')[2] == 'zm.avvatta.com' ) {
      this.hideFooter = false;
    }
    setTimeout (() => {
      this.test = 'unset';
   }, 1000);
  }
 help(val){
   this.common.goToHelp(val);
 }

 giftModal(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  const modalDialog = this.matDialog.open(RedeemgiftComponent, dialogConfig);
}

chooseModal(){
  if (localStorage.getItem("log") === null) {
    this.common.loginModal();
  }
 else{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.data = {
    select: 4
  }
  const modalDialog = this.matDialog.open(SubscriptionComponent, dialogConfig);
 }
}
}
