import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  staffId?: number;
  staff?: string;  // POST field
  staffName?: string;  // returned from GET
  imagePath?: string | null;
  imageUpload?: any;
  uniqueStaffAttendanceNumber?: number;
  gender: string;
  dob: string;
  fatherName?: string | null;
  motherName?: string | null;
  temporaryAddress?: string | null;
  permanentAddress: string;
  contactNumber1: string;
  email: string;
  qualifications: string;
  joiningDate: string;
  designation: string;
  bankAccountName?: string | null;
  bankAccountNumber?: number | null;
  bankName?: string | null;
  bankBranch?: string | null;
  status: string;
  departmentId?: number | null;
  department?: any;
  staffSalaryId?: number | null;
  staffSalary?: any;
  staffExperiences?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'https://visioncollegegojra.com/api/Staffs'; // ✅ Live API

  constructor(private http: HttpClient) {}

  // Get all staff
  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

  // Get single staff by ID
getStaffById(staffId: number): Observable<Staff> {
  return this.http.get<Staff>(`${this.apiUrl}/${staffId}`);
}


  // Add new staff
  addStaff(staff: Staff): Observable<Staff> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Staff>(this.apiUrl, staff, { headers });
  }

  // Update existing staff
  updateStaff(staffId: number, staff: Staff): Observable<Staff> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Staff>(`${this.apiUrl}/${staffId}`, staff, { headers });
  }

  // Delete staff
  deleteStaff(staffId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${staffId}`);
  }
}
