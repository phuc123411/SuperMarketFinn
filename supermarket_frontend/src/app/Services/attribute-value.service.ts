import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeValueService {

  private apiUrl = 'http://localhost:5005/api/products';

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.headerService.getHeaders();
  }
  getAttributeValues(productId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${productId}/attributes`, { headers });
  }

  getAttributeValue(productId: number, id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${productId}/attributes/${id}`, { headers });
  }

  createAttributeValue(productId: number, attribute_value: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/${productId}/attributes`, attribute_value, { headers });
  }

  updateAttributeValue(productId: number, id: number, attribute_value: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${productId}/attributes/${id}`, attribute_value, { headers });
  }

  deleteAttributeValue(productId: number, id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${productId}/attributes/${id}`, { headers });
  }
}
