// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { StaffListComponent } from './staff-list.component';

// describe('StaffListComponent', () => {
//   let component: StaffListComponent;
//   let fixture: ComponentFixture<StaffListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [StaffListComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(StaffListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });




import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffListComponent } from './staff-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('StaffListComponent', () => {
  let component: StaffListComponent;
  let fixture: ComponentFixture<StaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffListComponent, CommonModule,
    FormsModule
]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
