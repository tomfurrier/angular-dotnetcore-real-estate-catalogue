import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-real-estates',
  templateUrl: './real-estates.component.html',
  styleUrls: ['./real-estates.component.css']
})
export class RealEstatesComponent {}
