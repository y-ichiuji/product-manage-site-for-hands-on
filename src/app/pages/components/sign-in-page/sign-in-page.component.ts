import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RoutingService } from 'src/app/core/services/routing.service';
import { AccountService } from '../../services/account.service';
import { SignInRequestDto } from '../../models/dtos/requests/sign-in-request-dto';
import { Observable } from 'rxjs';
import { SignInResponseDto } from '../../models/dtos/requests/sign-in-response-dto';
import { UrlConst } from '../../constants/url-const';
import { User } from '../../models/user';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit, AfterViewChecked {
  signInUserAccount = new FormControl<string>('', [Validators.required]);
  signInUserPassword = new FormControl<string>('', [Validators.required]);

  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword,
  });

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private routingService: RoutingService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private titleService: TitleI18Service
  ) {}

  ngOnInit(): void {
    this.setupLanguage();
  }

  ngAfterViewChecked(): void {
    this.titleService.setTitle(UrlConst.PATH_SIGN_IN);
  }

  clickSignInButton() {
    const signInRequestDto = this.createSignInRequestDto();
    this.signIn(signInRequestDto);
  }

  private setupLanguage() {
    const language = this.getLanguage(navigator.language);
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }

  private getLanguage(language: string): string {
    if (language.indexOf('-') > 0) {
      const splittedLanguage: string[] = language.split('-');
      return splittedLanguage[0];
    }
    return language;
  }

  private createSignInRequestDto(): SignInRequestDto {
    return {
      Username: this.signInUserAccount.value ?? '',
      Password: this.signInUserPassword.value ?? '',
    };
  }

  private signIn(signInRequestDto: SignInRequestDto) {
    this.loadingService.startLoading();

    const signInResponseDto: Observable<SignInResponseDto> =
      this.accountService.signIn(signInRequestDto);
    signInResponseDto.subscribe((responseDto) => {
      if (responseDto != null) {
        this.setUpUserAccount(responseDto);
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);
      }
    });

    this.loadingService.stopLoading();
  }

  private setUpUserAccount(responseDto: SignInResponseDto) {
    const user: User = new User();
    user.userAccount = responseDto.userAccount;
    user.userName = responseDto.userName;
    user.userLocale = responseDto.userLocale;
    user.userLanguage = responseDto.userLanguage;
    user.userTimezone = responseDto.userTimezone;
    user.userTimezoneOffset = responseDto.userTimezoneOffset;
    user.userCurrency = responseDto.userCurrency;
    this.accountService.setUser(user);
  }
}
