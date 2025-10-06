import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
declare var $: any;
import {
  NgApexchartsModule,
  ChartComponent
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-staff-job-letter',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './staff-job-letter.component.html',
  styleUrl: './staff-job-letter.component.css'
})
export class StaffJobLetterComponent implements AfterViewInit {
ngAfterViewInit(): void {
  throw new Error('Method not implemented.');
}
  todayDate = new Date();
  
  teacher = {
    name: 'Ayesha Khan',
    designation: 'Senior Physics Teacher',
    subject: 'Physics',
    joiningDate: new Date('2025-10-15'),
    salary: 85000,
    address: 'House No. 21, Street 5, Johar Town',
    city: 'Lahore'
  };

  printLetter() {
    const printContents = document.getElementById('appointmentLetter')?.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=700');
    if (printWindow && printContents) {
      printWindow.document.write('<html><head><title>Teacher Appointment Letter</title>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  downloadPdf() {
    alert('PDF download feature will be added here.');
  }

  editLetter() {
    alert('Edit mode will open a form to update teacher details.');
  }

  sendSms() {
    alert(`SMS sent to ${this.teacher.name}!`);
  }


}
