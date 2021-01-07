import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  editmode = false;
  localId;
  product = {
    name: '',
    nameDe: '',
    nameFr: '',
    price: Number,
    link: '',
    content: '',
    contentDe: '',
    contentFr: '',
    image1: '',
    image2: '',
    image3: '',
  };
  products;
  image1: File | null;
  image2: File | null;
  image3: File | null;
  loggedIn = false;
  userName;
  pass;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }
  getProducts() {
    this.http
      .get('https://rosenfarbe.com/product/products')
      .subscribe((responseData) => {
        this.products = Object(responseData).products;
        console.log(this.products);
      });
  }
  delete(product) {
    this.http
      .delete('https://rosenfarbe.com/product/product/' + product._id)
      .subscribe((responseData) => {
        console.log(responseData);
        this.showSuccessOnDeleteing();
        this.getProducts();
      });
  }
  getFile(event) {
    this.image1 = event.target.files[0];
  }
  getFile2(event) {
    this.image2 = event.target.files[1];
  }
  getFile3(event) {
    this.image3 = event.target.files[2];
  }

  set(form) {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('nameDe', this.product.nameDe);
    formData.append('nameFr', this.product.nameFr);
    formData.append('price', this.product.price.toString());
    formData.append('content', this.product.content);
    formData.append('contentDe', this.product.contentDe);
    formData.append('contentFr', this.product.contentFr);
    formData.append('link', this.product.link);
    formData.append('image1Url', this.image1);
    formData.append('image2Url', this.image2);
    formData.append('image3Url', this.image3);

    // formData.forEach((value, key) => {
    //   console.log(key + ':' + value);
    // });
    // https://termehproduct.com
    this.http.post('https://rosenfarbe.com/product/product', formData).subscribe(
      (responseData) => {
        if (Object(responseData).status === 201) {
          console.log(201);
          this.showSuccess();
          this.getProducts();
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
    let product;
    this.http
      .get('https://rosenfarbe.com/product/product/' + id)
      .subscribe((responseData) => {
        product = Object(responseData).product;
        console.log(product);
        this.product.name = product.name;
        this.product.nameDe = product.nameDe;
        this.product.nameFr = product.nameFr;
        console.log(this.product.name);
        this.product.content = product.content;
        this.product.contentDe = product.contentDe;
        this.product.contentFr = product.contentFr;
        this.product.price = product.price;
        this.product.link = product.link;
        this.product.image1 = product.image1Url;
        this.product.image2 = product.image2Url;
        this.product.image3 = product.image3Url;
      });
  }
  submitEdit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('nameDe', this.product.nameDe);
    formData.append('nameFr', this.product.nameFr);
    formData.append('price', this.product.price.toString());
    formData.append('content', this.product.content);
    formData.append('contentDe', this.product.contentDe);
    formData.append('contentFr', this.product.contentFr);
    formData.append('link', this.product.link);
    formData.append('image1Url', this.image1);
    formData.append('image2Url', this.image2);
    formData.append('image3Url', this.image3);
    this.http
      .put('https://rosenfarbe.com/product/product/' + this.localId, formData)
      .subscribe(
        (responseData) => {
          console.log(Object(responseData).product);

          this.showSuccess();
        },
        (err) => {
          this.showError();
        }
      );
    this.getProducts();
  }
  // Pop Up Functions :
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product Added!',
    });
  }
  showSuccessOnDeleteing() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product Deleted !',
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

  login(form){
    if(this.userName === 'admin' && this.pass === 'farhang'){
      this.loggedIn = true;
      this.getProducts();
    }
  }

}
