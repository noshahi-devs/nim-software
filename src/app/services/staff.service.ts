import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Model defined inside service
export interface Staff {
  id: number;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  profile?: string; // profile image URL
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  // ✅ Replace with your actual API endpoint
  private apiUrl = 'https://visioncollegegojra.com/api/Staffs';

  constructor(private http: HttpClient) {}

  // ✅ Fetch all staff
  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

  // ✅ Fetch a single staff by ID
  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add new staff
  addStaff(staff: Staff): Observable<any> {
    return this.http.post(this.apiUrl, staff);
  }

  // ✅ Update staff
  updateStaff(id: number, staff: Staff): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, staff);
  }

  // ✅ Delete staff
  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
