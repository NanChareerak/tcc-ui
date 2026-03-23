import { Component } from '@angular/core';
import { BarcodeListComponent } from '../barcode-list/barcode-list';


@Component({
  selector: 'app-barcode-home',
  imports: [BarcodeListComponent],
  templateUrl: './barcode-home.html',
  styleUrl: './barcode-home.scss',
})
export class BarcodeHome {}
