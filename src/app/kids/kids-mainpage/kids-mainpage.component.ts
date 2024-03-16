import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceService as service1 }  from '../../../app/general/service.service';
import { environment } from '../../../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { GoogleanalyticsserviceService } from 'src/app/googleanalyticsservice.service';
@Component({
  selector: 'app-kids-mainpage',
  templateUrl: './kids-mainpage.component.html',
  styleUrls: ['./kids-mainpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KidsMainpageComponent implements OnInit {
  trending;
  videoData:[];
  selectelearn;
  cat;
  mainList;
  subCategoryList;
  wholeData: Array<any> = [];
  mn;
  pid; 
  cid;
  alertMessage
  alertShow
  monSession;

  constructor(private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,

    private service1: service1,
    private common: CommonService, 
    private deviceService: DeviceDetectorService,
    private gService: GoogleanalyticsserviceService) {
      // alert('helloow')
  }

  ngOnInit(): void {

    this.common.loaderOnLoad();
    this.selectelearn = '4';
    this.goToSubcription();
    this.onResize();
    this.getCategoryItem(this.selectelearn);
    this.getVideoDataUrl();
    this.gService.init();
    let mobileNumber;
    this.route.queryParams
    .subscribe(params => {
      //console.error(params.mn, params.pid); 
      this.mn = params.mn,
      this.pid = params.pid,
      this.cid = params.cptid,
      this.monSession = params.mondia_session

      //console.error(this.mn,this.pid,this.cid,"ppppppooooooooddddd")


  this.common.getMnPid(this.mn, this.pid, this.cid);
  // this.common.getmondia(this.monSession);
if(this.mn && this.pid){
  this.common.getMnPid(this.mn, this.pid, this.cid);
}
if(this.mn && this.pid){
  this.common.getMnPid(this.mn, this.pid, this.cid);
}
if(this.monSession){
  this.common.getmondia(this.monSession);
}

  if(this.mn != undefined && this.pid != undefined){
    console.log(parseInt(this.mn, 16).toString(10));
    mobileNumber = parseInt(this.mn, 16).toString(10);
    let data={    
      "msisdn":mobileNumber
  }
  // if (window.location.href.split('/')[2] == 'zm.avvatta.com'){
    if (window.location.href.split('/')[2] == 'localhost:4200'){

    this.service1.clearLoggeddevice(data).subscribe(d =>{
      let resetToken;
      
      resetToken = {
        user_id : JSON.parse(JSON.stringify(d)).user_id,
        token : JSON.parse(JSON.stringify(d)).token
      };
      this.service1.ngResetToken(resetToken).subscribe(t =>{
        // console.log('success');
        
    this.emailphone = [{"name":"mobile","value":mobileNumber}]
    localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));

    this.initialLogin();
      });
    });
  // }
  }
}
    // // console.log(this.deviceService.getDeviceInfo());
    // this.browserHistory();
    // this.testLoad = true;
    localStorage.setItem('subscription', "0");
    // this.category();
    this.onResize();
    // this.getSlideShow();
    // this.freemeiumVideo();
  } 
  );
}

ngAfterViewInit():void{
    this.tokenVerification()

  }
  tokenVerification(){
    //console.error("token bbbb")
    if(!(localStorage.getItem("log") === null)){
    let checkData:any;
    checkData = [{
      user_id: JSON.parse(localStorage.getItem('id')),
      token : localStorage.getItem('token')
    }];
    this.common.checkSignOutAll(checkData[0]).subscribe(data =>{
      let changePassword:any;
      changePassword = JSON.parse(JSON.stringify(data));
      
      // console.log(changePassword)
      if (changePassword.tokenmatch == false) {
        // alert(changePassword.tokenmatch);
        localStorage.clear();
        location.reload();
      }
    });
  }
}


  emailphone
  deviceType
  loginBy
  ipAddress
  initialLogin(){
    // alert('hello')
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
    let deviceName;
    if(this.deviceService.getDeviceInfo().device == 'Unknown'){
      deviceName = 'Windows';
    }
    else{
      deviceName = this.deviceService.getDeviceInfo().device;
    }

    let loginData = {};
    loginData = {
      device_type: this.deviceType || 'web',
      login_by: this.loginBy || 'manual',
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      password: '12345678',
      device_browser:this.deviceService.getDeviceInfo().browser,
      device_ip:this.ipAddress,
      device_os:deviceName
    };
    //console.error(loginData);
    this.service1.loginCall(loginData).subscribe(data => {
      let successData;
      successData = JSON.parse(JSON.stringify(data));
      localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
      if (successData.success == false) {
        this.errorMessage(successData.error_messages);
      }
      else {
        this.successMessage(successData.message);
        localStorage.setItem('firstname', successData.firstname);
        localStorage.setItem('subprofiles', JSON.stringify(successData.subprofiles));
        localStorage.setItem('main', JSON.stringify(successData.subprofiles[0]));
        localStorage.setItem('log', JSON.stringify(data));
        localStorage.setItem('log', JSON.stringify(data));
        localStorage.setItem('id', successData.id);
        localStorage.setItem('email', successData.email);
        localStorage.setItem('token', successData.token);
        localStorage.setItem('parentpin', successData.set_parent);
        localStorage.setItem('logedid', successData.loged_user_id);
        // let leapLog;
        // leapLog = {
        //   email: this.emailphone[0].value,
        //   password: login.value.password,
        // }
        // this.common.leapLearningLoginToken(leapLog).subscribe(data=>{

        //   localStorage.setItem('leapToken', JSON.parse(JSON.stringify(data)).token);
        //   // console.log(data);
        // })
        // // console.log(login.value)
        // this.common.loaderStop();
        // return;
        // localStorage.setItem('firstname', successData.firstname);
        // this.dialogRef.close();
        // alert(this.pid)
      }

      //console.error(successData);

    }, err => {
      this.common.loaderStop();
    });
  }


  // Category
  // category() {
  //   this.service.categoried().subscribe(data => {
  //     // console.log(data);
  //   })
  // }
  
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760 ) {
      this.mainList = {
        "slidesToShow": 5,
        "slidesToScroll": 5,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.trending = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
    else {
      this.trending = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.mainList = {
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
  }

  goToPlayVideoPage(val, sub_cat) {
    // localStorage.setItem('clickPlay', "1");
    // this.router.navigateByUrl('/playvideo/' + window.location.href.split('/')[5] +'/' + '57' + '/' +[val][0].id);
    
    // this.common.loaderStart();
    // let data;
    // data = [{
    //   cat_id: parseInt(window.location.href.split('/')[5]),
    //   sub_cat: 57,
    // }];
    // this.service.categoryVideo(data[0]).subscribe(data => {
    //   if(data){
    //     this.videoData = JSON.parse(JSON.stringify(data)).content;
    //   // console.log(this.videoData);
    //   this.common.loaderStop();
    //   }
    // });
    this.common.checkLogin(val, "4", 'video', 'kids', val.id, '52', 'play', '0', sub_cat);
  }

  goToVideoPage(id) {
    // // console.log(id);
    // let subId;
    // switch (id) {
    //   case 54:
    //     subId = id;
    //     break;
    //   case 57:
    //     subId = id;
    //   case 58:
    //     subId = id;
    //     break;
    //     case 52:
    //     subId = id;
    //     break;
    //     case 51:
    //       this.router.navigateByUrl('mentalup');
    //       break;
    //   default:
    //     alert("No content to display");
    //     break;
    // }
    // this.common.userActivity('video', 'kids', '', 'kids_sub', 'interact', '0');
    this.common.checkAllSignOut();
    if(id == 51){
      this.common.mentalUpCheckLogin('mentalup', 4);
      // this.router.navigateByUrl('mentalup'); 
    }
    else{
      this.router.navigateByUrl('/kids/' + this.selectelearn + '/' + id);
    }
  }

  getCategoryItem(clickId) {
    this.common.loaderStart();
    let datas;
    datas = [{
      cat_id: clickId
    }]
    this.service.subCategory(datas[0]).subscribe(data => {
      if (data) {
        this.subCategoryList = JSON.parse(JSON.stringify(data)).categories;
      // console.log(this.subCategoryList);
    //  alert(this.subCategoryList);
        this.common.loaderStop();
      }
    })
  }

  goToSubcription() {
    this.cat = [
      {
        id: 4,
        name: "Growth and development",
        img: environment.imageUrl+'kids.webp',
      }
    ];
  }

  getVideoDataUrl() {
      this.common.loaderStart();
      let data;
      data = [{
        cat_id: 4,
        sub_cat: 52,
      }];
      this.service.categoryVideo(data[0]).subscribe(data => {
        if(data){
          this.videoData = JSON.parse(JSON.stringify(data)).content;
        // //console.error(this.videoData);
        this.common.loaderStop();
        }
      });
  }

  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }
  
  successMessage(message){
    this.alertMessage = { success: message };
    this.alertShow = true;
  }
  
  getIpAddress(){
    this.service1.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    
    }, err => {
      this.common.loaderStop();
    });
  }
}
