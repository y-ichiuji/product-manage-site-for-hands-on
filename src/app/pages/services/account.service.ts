import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';
import { Observable, catchError, of } from 'rxjs';
import { SignInResponseDto } from '../models/dtos/requests/sign-in-response-dto';
import { ApiConst } from '../constants/api-const';
import { User } from '../models/user';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { AppConst } from '../constants/app-const';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private errorMessagingService: ErrorMessagingService
  ) {}

  signIn(signInRequestDto: SignInRequestDto): Observable<SignInResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;
    const headers = new HttpHeaders({
      authorization:
        'Basic ' +
        btoa(signInRequestDto.Username + ':' + signInRequestDto.Password),
    });

    return this.http
      .post<SignInResponseDto>(webApiUrl, signInRequestDto, { headers })
      .pipe(
        catchError((error) => {
          this.errorMessagingService.setupPageErrorMessageFromResponse(error);
          return of(null as unknown as SignInResponseDto);
        })
      );
  }

  getUser(): User {
    return SessionStorageService.getItem(AppConst.STORAGE_KEY_USER, new User());
  }

  setUser(user: User): void {
    SessionStorageService.setItem(AppConst.STORAGE_KEY_USER, user);
  }

  removeUser(): void {
    SessionStorageService.removeItem(AppConst.STORAGE_KEY_USER);
  }
}
