import { SampleThumbComponent } from "./sample/sample-thumb/sample-thumb.component";
import { SampleComponent } from "./sample/sample.component";
import { SignAndSendComponent } from "./order/sign-and-send/sign-and-send.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardsComponent } from "./cards/cards.component";
import { CardComponent } from "./card/card.component";
import { environment } from "../environments/environment";
import { DetailComponent } from "./detail/detail.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { OrderComponent } from "./order/order.component";
import { ImagegridComponent } from "./modules/imagegrid/imagegrid.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StatusComponent } from "./status/status.component";
import { CartComponent } from "./modules/cart/cart.component";
import { MenuComponent } from "./modules/menu/menu.component";
import { SearchComponent } from "./modules/search/search.component";
import { PageComponent } from "./page/page.component";
import { Safe } from "./modules/safe";
import { IonicModule } from "@ionic/angular";
import { HomeComponent } from "./home/home.component";
import { EventsComponent } from "./events/events.component";
import { GiftsComponent } from "./gifts/gifts.component";

import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { LoginComponent } from "./login/login.component";
import { NgxPayPalModule } from "ngx-paypal";
import { RatingComponent } from "./modules/rating/rating.component";
import { NgxFeedbackModule } from "ngx-feedback";
import { CreationsComponent } from "./creations/creations.component";
import { StickersComponent } from "./stickers/stickers.component";
import { RatingDecimalComponent } from "./modules/rating-decimal/rating-decimal.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TabsComponent } from "./pages/tabs/tabs.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ProfileComponent } from "./settings/profile/profile.component";
import { RatingSummaryComponent } from "./modules/rating-summary/rating-summary.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { PreferencesComponent } from "./settings/preferences/preferences.component";
import { SuggestionListComponent } from "./modules/suggestion-list/suggestion-list.component";
import { ReviewComponent } from "./modules/review/review.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HeaderComponent } from "./pages/header/header.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { ProfileInfoComponent } from "./settings/profile/profile-info/profile-info.component";
import { ProfileShippingAddressComponent } from "./settings/profile/profile-shipping-address/profile-shipping-address.component";
import { ProfileChangePasswordComponent } from "./settings/profile/profile-change-password/profile-change-password.component";
import { ProfileCommunicationComponent } from "./settings/profile/profile-communication/profile-communication.component";
import { MothersDayComponent } from "./mothers-day/mothers-day.component";
import { MotherCardsComponent } from "./mothers-day/mother-cards/mother-cards.component";
import { MotherGiftsComponent } from "./mothers-day/mother-gifts/mother-gifts.component";
import { MotherGreetingsComponent } from "./mothers-day/mother-greetings/mother-greetings.component";
import { ProfileOrdersComponent } from "./settings/profile/profile-orders/profile-orders.component";
import { FavoriteComponent } from "./modules/favorite/favorite.component";
import { ProfileListComponent } from "./settings/profile/profile-list/profile-list.component";
import { SubHeaderComponent } from "./pages/sub-header/sub-header.component";
import { SubFooterComponent } from "./pages/sub-footer/sub-footer.component";
import { MessageComponent } from "./message/message.component";
import { FathersDayComponent } from "./fathers-day/fathers-day.component";
import { HomeFeaturedComponent } from "./modules/home-featured/home-featured.component";
import { HomeBestsellerComponent } from "./modules/home-bestseller/home-bestseller.component";
import { FatherGreetingsComponent } from "./fathers-day/father-greetings/father-greetings.component";
import { CartsComponent } from "./carts/carts.component";
import { GiftEventsComponent } from "./modules/gift-events/gift-events.component";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { SignAndSendCardsComponent } from "./sign-and-send-cards/sign-and-send-cards.component";
import { EventListComponent } from "./modules/event-list/event-list.component";
import { AddMoreComponent } from "./modules/add-more/add-more.component";
import { AddMoreItemComponent } from "./modules/add-more/add-more-item/add-more-item.component";
import { CartThumbComponent } from "./carts/cart-thumb/cart-thumb.component";
import { SignAndSendPageComponent } from "./sign-and-send-page/sign-and-send-page.component";
import { GraduationComponent } from "./graduation/graduation.component";
import { GraduationGreetingsComponent } from "./graduation/graduation-greetings/graduation-greetings.component";
import { ProfileOrderThumbComponent } from "./settings/profile/profile-orders/profile-order-thumb/profile-order-thumb.component";
import { ProfilePaymentThumbComponent } from "./settings/profile/profile-orders/profile-payment-thumb/profile-payment-thumb.component";
import { CardListComponent } from "./card-list/card-list.component";
import { JustBecauseComponent } from "./just-because/just-because.component";
import { JustBecauseGreetingsComponent } from "./just-because/just-because-greetings/just-because-greetings.component";
import { EmojiComponent } from "./modules/emoji/emoji.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { OrdercountComponent } from "./modules/ordercount/ordercount.component";
import { SpecialtyCardsPageComponent } from "./specialty-cards-page/specialty-cards-page.component";
import { ECardsPageComponent } from "./e-cards-page/e-cards-page.component";
import { ImageLoaderComponent } from "./modules/image-loader/image-loader.component";
import { TypeUpgradeComponent } from "./order/type-upgrade/type-upgrade.component";
import { EventComponent } from "./modules/event-list/event/event.component";
import { GiftEventComponent } from "./modules/gift-events/gift-event/gift-event.component";
import { HalloweenComponent } from "./halloween/halloween.component";
import { HalloweenGreetingsComponent } from "./halloween/halloween-greetings/halloween-greetings.component";
import { CardsSliderComponent } from "./modules/cards-slider/cards-slider.component";
import { CardSliderThumbComponent } from "./modules/cards-slider/card-slider-thumb/card-slider-thumb.component";
import { HalloweenCardComponent } from "./halloween/halloween-card/halloween-card.component";
import { ImagegridViewComponent } from "./modules/imagegrid/imagegrid-view/imagegrid-view.component";
import { BundleComponent } from "./order/bundle/bundle.component";
import { LightboxComponent } from "./modules/lightbox/lightbox.component";
import { ChristmasComponent } from "./christmas/christmas.component";
import { ChristmasGreetingsComponent } from "./christmas/christmas-greetings/christmas-greetings.component";
import { SignAndSendEventsComponent } from "./sign-and-send-events/sign-and-send-events.component";
import { PoetryComponent } from "./poetry/poetry.component";
import { NewyearComponent } from "./newyear/newyear.component";
import { NewyearGreetingsComponent } from "./newyear/newyear-greetings/newyear-greetings.component";
import { ValentinesComponent } from "./valentines/valentines.component";
import { ValentinesGreetingsComponent } from "./valentines/valentines-greetings/valentines-greetings.component";
import { PostcardsComponent } from "./postcards/postcards.component";
import { PostcardThumbComponent } from "./postcards/postcard-thumb/postcard-thumb.component";
import { SamplePlayerComponent } from "./sample/sample-player/sample-player.component";
import { ECardEventComponent } from "./e-cards-page/ecard-event/ecard-event.component";
import { ECardComponent } from "./ecard/ecard.component";
import { ECardImageGridComponent } from "./modules/ecard-image-grid/ecard-image-grid.component";
import { ECardOrderComponent } from "./ecard-order/ecard-order.component";
import { PlayComponent } from "./play/play.component";
import { StickersCardsComponent } from "./stickers-cards/stickers-cards.component";
import { PoetryCardsComponent } from "./poetry-cards/poetry-cards.component";
import { CartTotalComponent } from "./carts/cart-total/cart-total.component";
import { FavoriteCardComponent } from "./settings/profile/profile-list/favorite-card/favorite-card.component";
import { PhotoUploadComponent } from "./order/photo-upload/photo-upload.component";
import { MessageAreaComponent } from "./modules/message-area/message-area.component";
import { CommentsComponent } from "./modules/comments/comments.component";
import { CommentComponent } from "./modules/comments/comment/comment.component";
import { EmailMessageComponent } from "./email-message/email-message.component";
import { SearchListComponent } from "./search-list/search-list.component";
import { SearchListingComponent } from "./search-list/search-listing/search-listing.component";
import { ClipartComponent } from "./clipart/clipart.component";
import { ClipartCardComponent } from "./clipart-card/clipart-card.component";
import { ReadmoreComponent } from "./modules/readmore/readmore.component";
import { CartConfirmComponent } from "./carts/cart-confirm/cart-confirm.component";
import { GamesComponent } from "./games/games.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { HomeMobileComponent } from "./home-mobile/home-mobile.component";
import { EventsMobileComponent } from "./events-mobile/events-mobile.component";
import { EventPreviewComponent } from "./components/mobile/event-preview/event-preview.component";
import { CreationsMobileComponent } from "./creations-mobile/creations-mobile.component";
import { SignUpMobileComponent } from "./sign-up-mobile/sign-up-mobile.component";
import { StickersMobileComponent } from './stickers-mobile/stickers-mobile.component';
import { StickersCardsMobileComponent } from './stickers-cards-mobile/stickers-cards-mobile.component';
import { SignAndSendMobileComponent } from './sign-and-send-mobile/sign-and-send-mobile.component';
import { SignAndSendPageMobileComponent } from './sign-and-send-page-mobile/sign-and-send-page-mobile.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { SpecialtyCardsPageMobileComponent } from './specialty-cards-page-mobile/specialty-cards-page-mobile.component';

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
    HomeMobileComponent,
    EventsMobileComponent,
    EventPreviewComponent,
    CreationsMobileComponent,
    SignUpMobileComponent,
    StickersMobileComponent,
    StickersCardsMobileComponent,
    SignAndSendMobileComponent,
    SignAndSendPageMobileComponent,
    HeaderMobileComponent,
    SpecialtyCardsPageMobileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
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
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/lang/", ".json");
}
