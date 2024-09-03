import { StickersCardsComponent } from './pages/stickers-cards/stickers-cards.component';
import { SignAndSendEventsComponent } from './pages/sign-and-send-events/sign-and-send-events.component';
import { SpecialtyCardsPageComponent } from './pages/specialty-cards-page/specialty-cards-page.component';
import { SignAndSendCardsComponent } from './pages/sign-and-send-cards/sign-and-send-cards.component';
import { StickersComponent } from './pages/stickers/stickers.component';
import { StatusComponent } from './pages/status/status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { SignAndSendPageComponent } from './pages/sign-and-send-page/sign-and-send-page.component';
import { ValentinesComponent } from './pages/valentines/valentines.component';
import { ValentinesGreetingsComponent } from './pages/valentines/valentines-greetings/valentines-greetings.component';
import { HomeComponent } from './pages/home/home.component';
import { MothersDayComponent } from './pages/mothers-day/mothers-day.component';
import { MotherCardsComponent } from './pages/mothers-day/mother-cards/mother-cards.component';
import { MotherGiftsComponent } from './pages/mothers-day/mother-gifts/mother-gifts.component';
import { MotherGreetingsComponent } from './pages/mothers-day/mother-greetings/mother-greetings.component';
import { FathersDayComponent } from './pages/fathers-day/fathers-day.component';
import { FatherGreetingsComponent } from './pages/fathers-day/father-greetings/father-greetings.component';
import { EventsComponent } from './pages/events/events.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { CreationsComponent } from './pages/creations/creations.component';
import { CardsComponent } from './pages/cards/cards.component';
import { DetailComponent } from './pages/detail/detail.component';
import { OrderComponent } from './pages/order/order.component';
import { ECardOrderComponent } from './pages/ecard-order/ecard-order.component';
import { SignAndSendComponent } from './pages/order/sign-and-send/sign-and-send.component';
import { PageComponent } from './pages/page/page.component';
import { LoginComponent } from './pages/login/login.component';
import { CartsComponent } from './pages/carts/carts.component';
import { CartConfirmComponent } from './pages/carts/cart-confirm/cart-confirm.component';
import { GraduationComponent } from './pages/graduation/graduation.component';
import { GraduationGreetingsComponent } from './pages/graduation/graduation-greetings/graduation-greetings.component';
import { JustBecauseComponent } from './pages/just-because/just-because.component';
import { JustBecauseGreetingsComponent } from './pages/just-because/just-because-greetings/just-because-greetings.component';
import { ECardsPageComponent } from './pages/e-cards-page/e-cards-page.component';
import { HalloweenComponent } from './pages/halloween/halloween.component';
import { HalloweenGreetingsComponent } from './pages/halloween/halloween-greetings/halloween-greetings.component';
import { ChristmasComponent } from './pages/christmas/christmas.component';
import { ChristmasGreetingsComponent } from './pages/christmas/christmas-greetings/christmas-greetings.component';
import { PoetryComponent } from './pages/poetry/poetry.component';
import { ClipartComponent } from './pages/clipart/clipart.component';
import { PoetryCardsComponent } from './pages/poetry-cards/poetry-cards.component';
import { NewyearComponent } from './pages/newyear/newyear.component';
import { NewyearGreetingsComponent } from './pages/newyear/newyear-greetings/newyear-greetings.component';
import { PostcardsComponent } from './pages/postcards/postcards.component';
import { SampleComponent } from './pages/sample/sample.component';
import { SamplePlayerComponent } from './pages/sample/sample-player/sample-player.component';
import { PlayComponent } from './pages/play/play.component';
import { EmailMessageComponent } from './pages/email-message/email-message.component';
import { GamesComponent } from './pages/games/games.component';
import { NewHomeComponent } from './new-pages/new-home/new-home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NewLayoutComponent } from './new-pages/new-layout/new-layout.component';
import { NewCardsComponent } from './new-pages/new-cards/new-cards.component';
import { NewStickersComponent } from './new-pages/new-stickers/new-stickers.component';
import { NewPostcardsComponent } from './new-pages/new-postcards/new-postcards.component';
import { NewGiftsComponent } from './new-pages/new-gifts/new-gifts.component';
import { NewProfileComponent } from './new-pages/new-profile/new-profile.component';
import { NewWishlistComponent } from './new-pages/new-wishlist/new-wishlist.component';
import { NewCartComponent } from './new-pages/new-cart/new-cart.component';
import { NewRegistrationComponent } from './new-pages/new-registration/new-registration.component';
import { NewDetailsComponent } from './new-pages/new-details/new-details.component';
import { NewContactUsComponent } from './new-pages/new-links/new-contact-us/new-contact-us.component';
import { NewTermsAndConditionComponent } from './new-pages/new-links/new-terms-and-condition/new-terms-and-condition.component';
import { NewChatNowComponent } from './new-pages/new-links/new-chat-now/new-chat-now.component';
import { NewReviewProductComponent } from './new-pages/new-links/new-review-product/new-review-product.component';
import { NewAboutComponent } from './new-pages/new-links/new-about/new-about.component';
import { NewPressPageComponent } from './new-pages/new-links/new-press-page/new-press-page.component';
import { NewSignAndSendComponent } from './new-pages/new-links/new-sign-and-send/new-sign-and-send.component';
import { NewShippingAndDeliveryComponent } from './new-pages/new-links/new-shipping-and-delivery/new-shipping-and-delivery.component';
import { NewPrivacyPolicyComponent } from './new-pages/new-links/new-privacy-policy/new-privacy-policy.component';
import { NewRegistrationCompleteComponent } from './new-pages/new-registration-complete/new-registration-complete.component';
import { NewCheckoutComponent } from './new-pages/new-checkout/new-checkout.component';
import { NewPaymentComponent } from './new-pages/new-payment/new-payment.component';
import { NewPersonalizesComponent } from './new-pages/new-personalizes/new-personalizes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/new",
    pathMatch: 'full'

  },
  {
    path: 'old',
    component: LayoutComponent,
    children: [
      {
        path: '', component: HomeComponent, title: "FibeiGreetings"
      },
      {
        path: 'home', component: HomeComponent, title: "FibeiGreetings Homepage"
      },
      {
        path: 'mother', component: MothersDayComponent, title: "FibeiGreetings MothersDay"
      },
      {
        path: 'mother/cards', component: MotherCardsComponent, title: "FibeiGreetings MothersDay Card"
      },
      {
        path: 'mother/gifts', component: MotherGiftsComponent, title: "FibeiGreetings MothersDay Gifts"
      },
      {
        path: 'mother/greetings', component: MotherGreetingsComponent, title: "FibeiGreetings MothersDay Greetings"
      },
      {
        path: 'father', component: FathersDayComponent, title: "FibeiGreetings FathersDay"
      },
      {
        path: 'father/greetings', component: FatherGreetingsComponent, title: "FibeiGreetings FathersDay Greetings"
      },
      {
        path: 'tabs', component: TabsComponent, title: "FibeiGreetings"
      },
      {
        path: 'profile/:id', component: ProfileComponent, title: "FibeiGreetings User Profile"
      },
      {
        path: 'events', component: EventsComponent, title: "FibeiGreetings Events"
      },
      {
        path: 'gifts', component: GiftsComponent, title: "FibeiGreetings Gifts"
      },
      {
        path: 'creations', component: CreationsComponent, title: "FibeiGreetings Creations"
      },
      {
        path: 'stickers', component: StickersComponent, title: "FibeiGreetings Stickers"
      },
      {
        path: 'stickercards', component: StickersCardsComponent, title: "FibeiGreetings Stickercards"
      },
      {
        path: 'stickercards/:id', component: StickersCardsComponent, title: "FibeiGreetings Stickercards"
      },
      {
        path: 'signandsend', component: SignAndSendEventsComponent, title: 'FibeiGreetings Sign & Send'
      },
      {
        path: 'signandsendcards/:id', component: SignAndSendCardsComponent, title: "FibeiGreetings Sign & Send"
      },
      {
        path: 'cards/events/:event', component: CardsComponent, title: "FibeiGreetings Cards"
      },
      {
        path: 'cards/events/:event/:recipient', component: CardsComponent, title: "FibeiGreetings Cards"
      },
      {
        path: 'cards/event/:id', component: CardsComponent, title: "FibeiGreetings Cards"
      },
      {
        path: 'cards/event/:id/:recipient', component: CardsComponent, title: "FibeiGreetings Cards"
      },
      {
        path: 'search/:search', component: CardsComponent, title: "Fibei Greetings Search"
      },
      {
        path: 'e-cards/events/:id', component: CardsComponent, title: "FibeiGreetings e-Card"
      },
      {
        path: 'card/:id', component: DetailComponent, title: "FibeiGreetings Card"
      },
      {
        path: 'order/:id', component: OrderComponent, title: "FibeiGreetings Order"
      },
      {
        path: 'order/:id/:orderid', component: OrderComponent, title: "FibeiGreetings Order"
      },
      {
        path: 'ecardorder/:id', component: ECardOrderComponent, title: "FibeiGreetings e-Card Order"
      },
      {
        path: 'signandsend/:id', component: SignAndSendComponent, title: "FibeiGreetings Sign & Send"
      },
      {
        path: 'status/:id', component: StatusComponent, title: "FibeiGreetings Status"
      },
      {
        path: 'page/:id', component: PageComponent, title: "Fibei Greetings Page"
      },
      {
        path: 'login', component: LoginComponent, title: "FibeiGreetings Login"
      },
      {
        path: 'cart', component: CartsComponent, title: 'FibeiGreetings Cart'
      },
      {
        path: 'confirm/:id', component: CartConfirmComponent, title: 'FibeiGreetings Cart'
      },
      {
        path: 'signandsendpage', component: SignAndSendPageComponent, title: "FibeiGreetings Sign & Send Page"
      },
      {
        path: 'graduation', component: GraduationComponent, title: "FibeiGreetings Graduation"
      },
      {
        path: 'graduation/greetings', component: GraduationGreetingsComponent, title: "FibeiGreetings Graduation Greetings"
      },
      {
        path: 'justbecause', component: JustBecauseComponent, title: "FibeiGreetings Just Because"
      },
      {
        path: 'justbecause/greetings', component: JustBecauseGreetingsComponent, title: "FibeiGreetings Just Because Greetings"
      },
      {
        path: 'specialtycardpage', component: SpecialtyCardsPageComponent, title: "FibeiGreetings Specialty"
      },
      {
        path: 'ecardspage', component: ECardsPageComponent, title: "FibeiGreetings e-Cards Page"
      },
      {
        path: 'halloween', component: HalloweenComponent, title: "FibeiGreetings Halloween"
      },
      {
        path: 'halloween/greetings', component: HalloweenGreetingsComponent, title: "FibeiGreetings Halloween Greetings"
      },
      {
        path: 'christmas', component: ChristmasComponent, title: "FibeiGreetings Christmas"
      },
      {
        path: 'christmas/greetings', component: ChristmasGreetingsComponent, title: "FibeiGreetings Christmas Greetings"
      },
      {
        path: 'poetry', component: PoetryComponent, title: 'FibeiGreetings Poetry'
      },
      {
        path: 'cliparts', component: ClipartComponent, title: 'FibeiGreetings Clipart'
      },
      {
        path: 'poetrycards/:id', component: PoetryCardsComponent, title: "FibeiGreetings Poetry"
      },
      {
        path: 'newyear', component: NewyearComponent, title: "FibeiGreetings New Year"
      },
      {
        path: 'newyear/greetings', component: NewyearGreetingsComponent, title: "FibeiGreetings New Year Greetings"
      },
      {
        path: 'valentines', component: ValentinesComponent, title: "FibeiGreetings Valentines"
      },
      {
        path: 'valentines/greetings', component: ValentinesGreetingsComponent, title: "FibeiGreetings Valentines Greetings"
      },
      {
        path: 'postcards', component: PostcardsComponent, title: 'FibeiGreetings Postcards'
      },
      {
        path: 'e-cards', component: ECardsPageComponent, title: 'FibeiGreetings E-Cards'
      },
      {
        path: 'samples', component: SampleComponent, title: "FibeiGreetings Samples"
      },
      {
        path: 'player/:id', component: SamplePlayerComponent, title: "FibeiGreetings"
      },
      {
        path: 'play/:id', component: PlayComponent, title: "FibeiGreetings"
      },
      {
        path: 'playtrack/:id', component: PlayComponent, title: "FibeiGreetings"
      },
      {
        path: 'email/:type/:id', component: EmailMessageComponent, title: "FibeiGreetings"
      },
      {
        path: 'games', component: GamesComponent, title: "FibeiGreetings Games"
      },
    ]
  },
  {
    path: 'new',
    component: NewLayoutComponent,
    children: [
      {
        path: '',
        component: NewHomeComponent
      },
      {
        path: 'cards',
        children: [
          {
            path: ':id',
            component: NewCardsComponent
          }
        ]
      },
      {
        path: 'stickers',
        children: [
          {
            path: ':id',
            component: NewStickersComponent
          }
        ]
      },
      {
        path: 'postcards',
        children: [
          {
            path: ':id',
            component: NewPostcardsComponent
          }
        ]
      },
      {
        path: 'gifts',
        children: [
          {
            path: ':id',
            component: NewGiftsComponent
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: ':id',
            component: NewProfileComponent
          },
        ]
      },
      {
        path: 'wishlist',
        component: NewWishlistComponent
      },
      {
        path: 'details/:type/:id',
        component: NewDetailsComponent
      },
      {
        path: 'projects',
        component: NewPersonalizesComponent
      },
      {
        path: 'cart',
        component: NewCartComponent
      },
      {
        path: 'checkout',
        component: NewCheckoutComponent
      },
      {
        path: 'payment',
        children: [
          {
            path: ':gateway',
            component: NewPaymentComponent
          },
          {
            path: ':gateway/:id',
            component: NewPaymentComponent
          }
        ]
      },
      {
        path: 'registration',
        children: [
          {
            path: '',
            component: NewRegistrationComponent
          },
          {
            path: 'complete/:id',
            component: NewRegistrationCompleteComponent
          }
        ]
      },
      {
        path: 'link',
        children: [
          {
            path: 'contact-us',
            component: NewContactUsComponent
          },
          {
            path: 'chat-now',
            component: NewChatNowComponent
          },
          {
            path: 'review-product',
            component: NewReviewProductComponent
          },
          {
            path: 'about',
            component: NewAboutComponent
          },
          {
            path: 'press-page',
            component: NewPressPageComponent
          },
          {
            path: 'sign-and-send',
            component: NewSignAndSendComponent
          },
          {
            path: 'shipping-and-delivery',
            component: NewShippingAndDeliveryComponent
          },
          {
            path: 'terms-and-condition',
            component: NewTermsAndConditionComponent
          },
          {
            path: 'privacy-policy',
            component: NewPrivacyPolicyComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top", anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }



