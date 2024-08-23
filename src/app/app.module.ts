import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ImagegridComponent } from './components/imagegrid/imagegrid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from './pages/status/status.component';
import { CartComponent } from './components/cart/cart.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { Safe } from './components/safe';
import { IonicModule } from '@ionic/angular';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { NgxPayPalModule } from 'ngx-paypal';
import { RatingComponent } from './components/rating/rating.component';
import { NgxFeedbackModule } from 'ngx-feedback';
import { StickersComponent } from './pages/stickers/stickers.component';
import { RatingDecimalComponent } from './components/rating-decimal/rating-decimal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './components/tabs/tabs.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { RatingSummaryComponent } from './components/rating-summary/rating-summary.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PreferencesComponent } from './pages/settings/preferences/preferences.component';
import { SuggestionListComponent } from './components/suggestion-list/suggestion-list.component';
import { ReviewComponent } from './components/review/review.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileInfoComponent } from './pages/settings/profile/profile-info/profile-info.component';
import { ProfileShippingAddressComponent } from './pages/settings/profile/profile-shipping-address/profile-shipping-address.component';
import { ProfileChangePasswordComponent } from './pages/settings/profile/profile-change-password/profile-change-password.component';
import { ProfileCommunicationComponent } from './pages/settings/profile/profile-communication/profile-communication.component';
import { ProfileOrdersComponent } from './pages/settings/profile/profile-orders/profile-orders.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ProfileListComponent } from './pages/settings/profile/profile-list/profile-list.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { SubFooterComponent } from './components/sub-footer/sub-footer.component';
import { HomeFeaturedComponent } from './components/home-featured/home-featured.component';
import { HomeBestsellerComponent } from './components/home-bestseller/home-bestseller.component';
import { GiftEventsComponent } from './components/gift-events/gift-events.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SignAndSendCardsComponent } from './pages/sign-and-send-cards/sign-and-send-cards.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddMoreComponent } from './components/add-more/add-more.component';
import { AddMoreItemComponent } from './components/add-more/add-more-item/add-more-item.component';
import { SignAndSendPageComponent } from './pages/sign-and-send-page/sign-and-send-page.component';
import { ProfileOrderThumbComponent } from './pages/settings/profile/profile-orders/profile-order-thumb/profile-order-thumb.component';
import { ProfilePaymentThumbComponent } from './pages/settings/profile/profile-orders/profile-payment-thumb/profile-payment-thumb.component';
import { EmojiComponent } from './components/emoji/emoji.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrdercountComponent } from './components/ordercount/ordercount.component';
import { SpecialtyCardsPageComponent } from './pages/specialty-cards-page/specialty-cards-page.component';
import { ImageLoaderComponent } from './components/image-loader/image-loader.component';
import { EventComponent } from './components/event-list/event/event.component';
import { GiftEventComponent } from './components/gift-events/gift-event/gift-event.component';
import { CardsSliderComponent } from './components/cards-slider/cards-slider.component';
import { CardSliderThumbComponent } from './components/cards-slider/card-slider-thumb/card-slider-thumb.component';
import { ImagegridViewComponent } from './components/imagegrid/imagegrid-view/imagegrid-view.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { SignAndSendEventsComponent } from './pages/sign-and-send-events/sign-and-send-events.component';
import { ValentinesComponent } from './pages/valentines/valentines.component';
import { ValentinesGreetingsComponent } from './pages/valentines/valentines-greetings/valentines-greetings.component';
import { ECardImageGridComponent } from './components/ecard-image-grid/ecard-image-grid.component';
import { StickersCardsComponent } from './pages/stickers-cards/stickers-cards.component';
import { FavoriteCardComponent } from './pages/settings/profile/profile-list/favorite-card/favorite-card.component';
import { MessageAreaComponent } from './components/message-area/message-area.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { ReadmoreComponent } from './components/readmore/readmore.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { GamesComponent } from './pages/games/games.component';
import { CartConfirmComponent } from './pages/carts/cart-confirm/cart-confirm.component';
import { ClipartCardComponent } from './pages/clipart-card/clipart-card.component';
import { ClipartComponent } from './pages/clipart/clipart.component';
import { SearchListingComponent } from './pages/search-list/search-listing/search-listing.component';
import { SearchListComponent } from './pages/search-list/search-list.component';
import { EmailMessageComponent } from './pages/email-message/email-message.component';
import { PhotoUploadComponent } from './pages/order/photo-upload/photo-upload.component';
import { CartTotalComponent } from './pages/carts/cart-total/cart-total.component';
import { PoetryCardsComponent } from './pages/poetry-cards/poetry-cards.component';
import { PlayComponent } from './pages/play/play.component';
import { ECardOrderComponent } from './pages/ecard-order/ecard-order.component';
import { ECardComponent } from './pages/ecard/ecard.component';
import { ECardEventComponent } from './pages/e-cards-page/ecard-event/ecard-event.component';
import { SamplePlayerComponent } from './pages/sample/sample-player/sample-player.component';
import { PostcardsComponent } from './pages/postcards/postcards.component';
import { PostcardThumbComponent } from './pages/postcards/postcard-thumb/postcard-thumb.component';
import { NewyearGreetingsComponent } from './pages/newyear/newyear-greetings/newyear-greetings.component';
import { NewyearComponent } from './pages/newyear/newyear.component';
import { PoetryComponent } from './pages/poetry/poetry.component';
import { ChristmasGreetingsComponent } from './pages/christmas/christmas-greetings/christmas-greetings.component';
import { ChristmasComponent } from './pages/christmas/christmas.component';
import { BundleComponent } from './pages/order/bundle/bundle.component';
import { HalloweenCardComponent } from './pages/halloween/halloween-card/halloween-card.component';
import { HalloweenGreetingsComponent } from './pages/halloween/halloween-greetings/halloween-greetings.component';
import { HalloweenComponent } from './pages/halloween/halloween.component';
import { TypeUpgradeComponent } from './pages/order/type-upgrade/type-upgrade.component';
import { ECardsPageComponent } from './pages/e-cards-page/e-cards-page.component';
import { JustBecauseGreetingsComponent } from './pages/just-because/just-because-greetings/just-because-greetings.component';
import { JustBecauseComponent } from './pages/just-because/just-because.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { GraduationGreetingsComponent } from './pages/graduation/graduation-greetings/graduation-greetings.component';
import { GraduationComponent } from './pages/graduation/graduation.component';
import { CartThumbComponent } from './pages/carts/cart-thumb/cart-thumb.component';
import { CartsComponent } from './pages/carts/carts.component';
import { FatherGreetingsComponent } from './pages/fathers-day/father-greetings/father-greetings.component';
import { FathersDayComponent } from './pages/fathers-day/fathers-day.component';
import { MessageComponent } from './pages/message/message.component';
import { MotherGreetingsComponent } from './pages/mothers-day/mother-greetings/mother-greetings.component';
import { MotherGiftsComponent } from './pages/mothers-day/mother-gifts/mother-gifts.component';
import { MotherCardsComponent } from './pages/mothers-day/mother-cards/mother-cards.component';
import { MothersDayComponent } from './pages/mothers-day/mothers-day.component';
import { CardsComponent } from './pages/cards/cards.component';
import { CardComponent } from './pages/card/card.component';
import { DetailComponent } from './pages/detail/detail.component';
import { OrderComponent } from './pages/order/order.component';
import { PageComponent } from './pages/page/page.component';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { LoginComponent } from './pages/login/login.component';
import { CreationsComponent } from './pages/creations/creations.component';
import { SignAndSendComponent } from './pages/order/sign-and-send/sign-and-send.component';
import { SampleComponent } from './pages/sample/sample.component';
import { SampleThumbComponent } from './pages/sample/sample-thumb/sample-thumb.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewHomeComponent } from './new-pages/new-home/new-home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NewLayoutComponent } from './new-pages/new-layout/new-layout.component';
import { NewCardsComponent } from './new-pages/new-cards/new-cards.component';
import { NewStickersComponent } from './new-pages/new-stickers/new-stickers.component';
import { NewPostcardsComponent } from './new-pages/new-postcards/new-postcards.component';
import { NewGiftsComponent } from './new-pages/new-gifts/new-gifts.component';
import { NewTitleComponent } from './new-components/new-title/new-title.component';
import { NewCardThumbComponent } from './new-components/new-card-thumb/new-card-thumb.component';
import { NewCartComponent } from './new-pages/new-cart/new-cart.component';
import { NewWishlistComponent } from './new-pages/new-wishlist/new-wishlist.component';
import { NewProfileComponent } from './new-pages/new-profile/new-profile.component';
import { NewRegistrationComponent } from './new-pages/new-registration/new-registration.component';
import { NewSuggestionsComponent } from './new-components/new-suggestions/new-suggestions.component';
import { NewSuggestionsItemComponent } from './new-components/new-suggestions/new-suggestions-item/new-suggestions-item.component';
import { NewLayoutHeaderComponent } from './new-pages/new-layout/new-layout-header/new-layout-header.component';
import { NewLayoutStickersComponent } from './new-pages/new-layout/new-layout-stickers/new-layout-stickers.component';
import { NewLayoutPostcardsComponent } from './new-pages/new-layout/new-layout-postcards/new-layout-postcards.component';
import { NewLayoutGiftsComponent } from './new-pages/new-layout/new-layout-gifts/new-layout-gifts.component';
import { NewDetailsComponent } from './new-pages/new-details/new-details.component';
import { NewDetailsImagesComponent } from './new-pages/new-details/new-details-images/new-details-images.component';
import { NewContactUsComponent } from './new-pages/new-links/new-contact-us/new-contact-us.component';
import { NewTermsAndConditionComponent } from './new-pages/new-links/new-terms-and-condition/new-terms-and-condition.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NewInfoMessageComponent } from './new-components/new-info-message/new-info-message.component';
import { NewLoginComponent } from './new-components/new-login/new-login.component';
import { NewLayoutFooterComponent } from './new-pages/new-layout/new-layout-footer/new-layout-footer.component';
import { NewLoadingComponent } from './new-components/new-loading/new-loading.component';
import { NewPersonalizeComponent } from './new-pages/new-personalize/new-personalize.component';
import { NewPersonalizeButtonComponent } from './new-components/new-personalize-button/new-personalize-button.component';
import { NewAddCartButtonComponent } from './new-components/new-add-cart-button/new-add-cart-button.component';
import { NewRateComponent } from './new-components/new-rate/new-rate.component';
import { NewWishIndicatorComponent } from './new-components/new-wish-indicator/new-wish-indicator.component';
import { NewChatNowComponent } from './new-pages/new-links/new-chat-now/new-chat-now.component';
import { NewReviewProductComponent } from './new-pages/new-links/new-review-product/new-review-product.component';
import { NewAboutComponent } from './new-pages/new-links/new-about/new-about.component';
import { NewShippingAndDeliveryComponent } from './new-pages/new-links/new-shipping-and-delivery/new-shipping-and-delivery.component';
import { NewPrivacyPolicyComponent } from './new-pages/new-links/new-privacy-policy/new-privacy-policy.component';
import { NewPressPageComponent } from './new-pages/new-links/new-press-page/new-press-page.component';
import { NewSignAndSendComponent } from './new-pages/new-links/new-sign-and-send/new-sign-and-send.component';
import { NewEventsOptionsComponent } from './new-components/new-events-options/new-events-options.component';
import { NewStickerThumbComponent } from './new-components/new-sticker-thumb/new-sticker-thumb.component';
import { NewChangePasswordComponent } from './new-components/new-change-password/new-change-password.component';
import { NewChangeEmailComponent } from './new-components/new-change-email/new-change-email.component';
import { NewRegistrationCompleteComponent } from './new-pages/new-registration-complete/new-registration-complete.component';
import { NewInYourCartComponent } from './new-components/new-in-your-cart/new-in-your-cart.component';
import { NewCartViewComponent } from './new-components/new-in-your-cart/new-cart-view/new-cart-view.component';
import { NewPostcardThumbComponent } from './new-components/new-postcard-thumb/new-postcard-thumb.component';
import { NewProfileDetailsComponent } from './new-pages/new-profile/new-profile-details/new-profile-details.component';
import { NewProfileAddressesComponent } from './new-pages/new-profile/new-profile-addresses/new-profile-addresses.component';
import { NewCreateAddressComponent } from './new-components/new-create-address/new-create-address.component';
import { NewConfirmMessageComponent } from './new-components/new-confirm-message/new-confirm-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
    DetailComponent,
    OrderComponent,
    ImagegridComponent,
    StatusComponent,
    CartComponent,
    MenuComponent,
    SearchComponent,
    PageComponent,
    Safe,
    HomeComponent,
    EventsComponent,
    GiftsComponent,
    LoginComponent,
    RatingComponent,
    CreationsComponent,
    StickersComponent,
    RatingDecimalComponent,
    TabsComponent,
    ProfileComponent,
    RatingSummaryComponent,
    PreferencesComponent,
    SuggestionListComponent,
    ReviewComponent,
    HeaderComponent,
    FooterComponent,
    ProfileInfoComponent,
    ProfileShippingAddressComponent,
    ProfileChangePasswordComponent,
    ProfileCommunicationComponent,
    MothersDayComponent,
    MotherCardsComponent,
    MotherGiftsComponent,
    MotherGreetingsComponent,
    ProfileOrdersComponent,
    FavoriteComponent,
    ProfileListComponent,
    SubHeaderComponent,
    SubFooterComponent,
    MessageComponent,
    FathersDayComponent,
    HomeFeaturedComponent,
    HomeBestsellerComponent,
    FatherGreetingsComponent,
    SignAndSendComponent,
    StickersComponent,
    CartsComponent,
    GiftEventsComponent,
    SignAndSendCardsComponent,
    EventListComponent,
    AddMoreComponent,
    AddMoreItemComponent,
    CartThumbComponent,
    SignAndSendPageComponent,
    GraduationComponent,
    GraduationGreetingsComponent,
    ProfileOrderThumbComponent,
    ProfilePaymentThumbComponent,
    CardListComponent,
    JustBecauseComponent,
    JustBecauseGreetingsComponent,
    EmojiComponent,
    OrdercountComponent,
    SpecialtyCardsPageComponent,
    ECardsPageComponent,
    ImageLoaderComponent,
    TypeUpgradeComponent,
    EventComponent,
    GiftEventComponent,
    HalloweenComponent,
    HalloweenGreetingsComponent,
    CardsSliderComponent,
    CardSliderThumbComponent,
    HalloweenCardComponent,
    ImagegridViewComponent,
    BundleComponent,
    LightboxComponent,
    ChristmasComponent,
    ChristmasGreetingsComponent,
    SignAndSendEventsComponent,
    PoetryComponent,
    NewyearComponent,
    NewyearGreetingsComponent,
    ValentinesComponent,
    ValentinesGreetingsComponent,
    PostcardsComponent,
    PostcardThumbComponent,
    SampleComponent,
    SampleThumbComponent,
    SamplePlayerComponent,
    ECardEventComponent,
    ECardComponent,
    ECardImageGridComponent,
    ECardOrderComponent,
    PlayComponent,
    StickersCardsComponent,
    PoetryCardsComponent,
    CartTotalComponent,
    FavoriteCardComponent,
    PhotoUploadComponent,
    MessageAreaComponent,
    CommentsComponent,
    CommentComponent,
    EmailMessageComponent,
    SearchListComponent,
    SearchListingComponent,
    ClipartComponent,
    ClipartCardComponent,
    ReadmoreComponent,
    CartConfirmComponent,
    GamesComponent,
    SignUpComponent,
    RegisterComponent,
    NewHomeComponent,
    LayoutComponent,
    NewLayoutComponent,
    NewCardsComponent,
    NewStickersComponent,
    NewPostcardsComponent,
    NewGiftsComponent,
    NewTitleComponent,
    NewCardThumbComponent,
    NewCartComponent,
    NewWishlistComponent,
    NewProfileComponent,
    NewRegistrationComponent,
    NewSuggestionsComponent,
    NewSuggestionsItemComponent,
    NewLayoutHeaderComponent,
    NewLayoutStickersComponent,
    NewLayoutPostcardsComponent,
    NewLayoutGiftsComponent,
    NewDetailsComponent,
    NewDetailsImagesComponent,
    NewContactUsComponent,
    NewTermsAndConditionComponent,
    NewInfoMessageComponent,
    NewLoginComponent,
    NewLayoutFooterComponent,
    NewLoadingComponent,
    NewPersonalizeComponent,
    NewPersonalizeButtonComponent,
    NewAddCartButtonComponent,
    NewRateComponent,
    NewWishIndicatorComponent,
    NewChatNowComponent,
    NewReviewProductComponent,
    NewAboutComponent,
    NewShippingAndDeliveryComponent,
    NewPrivacyPolicyComponent,
    NewPressPageComponent,
    NewSignAndSendComponent,
    NewEventsOptionsComponent,
    NewStickerThumbComponent,
    NewChangePasswordComponent,
    NewChangeEmailComponent,
    NewRegistrationCompleteComponent,
    NewInYourCartComponent,
    NewCartViewComponent,
    NewPostcardThumbComponent,
    NewProfileDetailsComponent,
    NewProfileAddressesComponent,
    NewCreateAddressComponent,
    NewConfirmMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    NgxPayPalModule,
    NgxFeedbackModule,
    NgbModule,
    NgxImageZoomModule,
    AppRoutingModule,
    HttpClientModule,
    PickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}
