import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService],
})
export class AdminComponent {
  editmode = false;
  localId;
  event = {
    title: '',
    content: '',
    title2: '',
    content2: '',
    startTime: new Date(),
    endTime: new Date(),
    image: '',
  };
  events;
  dateStartTime: Date;
  dateEndTime: Date;
  image: File | null;
  startValue: Date;
  endValue: Date;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.getEvents();
  }

  getEvents() {
    this.http
      .get('https://termehfood.com/event/event')
      .subscribe((responseData) => {
        this.events = Object(responseData).events;
        console.log(this.events);
      });
  }
  delete(event) {
    this.http
      .delete('https://termehfood.com/event/event/' + event._id)
      .subscribe((responseData) => {
        console.log(responseData);
        this.showSuccessOnDeleteing();
        this.getEvents();
      });
  }
  getFiles(event) {
    this.image = event.target.files[0];
  }
  set(form) {
    const formData = new FormData();
    formData.append('title', this.event.title);
    formData.append('content', this.event.content);
    formData.append('title2', this.event.title2);
    formData.append('content2', this.event.content2);
    formData.append('startTime', this.event.startTime.toString());
    formData.append('endTime', this.event.endTime.toString());
    formData.append('image', this.image);

    // formData.forEach((value, key) => {
    //   console.log(key + ':' + value);
    // });
    this.http.post('https://termehfood.com/event/event', formData).subscribe(
      (responseData) => {
        if (Object(responseData).status === 201) {
          console.log(201);
          this.showSuccess();
          this.getEvents();
          form.reset();
        }
      },
      (err) => {
        this.showError();
      }
    );
  }
  getEditDetails(id) {
    this.editmode = true;
    this.localId = id;
    let event;
    this.http
      .get('https://termehfood.com/event/event/' + id)
      .subscribe((responseData) => {
        event = Object(responseData).event;
        console.log(event);
        this.event.title = event.title;
        this.event.content = event.content;
        this.event.title2 = event.title2;
        this.event.content2 = event.content2;
        this.event.startTime = new Date(event.startTime.split('T')[0]);
        this.event.endTime = new Date(event.endTime.split('T')[0]);
        this.event.image = event.image;
      });
  }
  submitEdit() {
    const formData = new FormData();
    formData.append('title', this.event.title);
    formData.append('content', this.event.content);
    formData.append('title2', this.event.title2);
    formData.append('content2', this.event.content2);
    formData.append('startTime', this.event.startTime.toString());
    formData.append('endTime', this.event.endTime.toString());
    formData.append('image', this.image);
    this.http
      .put('https://termehfood.com/event/event/' + this.localId, formData)
      .subscribe((responseData) => {
        console.log(Object(responseData).event);
        this.editmode = false;
      });
    this.getEvents();
  }
  // Pop Up Functions :
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Event Added!',
    });
  }
  showSuccessOnDeleteing() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Event Deleted !',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Someting Goes wrong (See console...)!',
    });
  }
  closeFunc(form) {
    this.editmode = false;
    form.reset();
  }
}
