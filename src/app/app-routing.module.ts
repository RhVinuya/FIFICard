import { EmailMessageComponent } from "./email-message/email-message.component";
import { PoetryCardsComponent } from "./poetry-cards/poetry-cards.component";
import { StickersCardsComponent } from "./stickers-cards/stickers-cards.component";
import { PlayComponent } from "./play/play.component";
import { ECardOrderComponent } from "./ecard-order/ecard-order.component";
import { SamplePlayerComponent } from "./sample/sample-player/sample-player.component";
import { SampleComponent } from "./sample/sample.component";
import { PostcardsComponent } from "./postcards/postcards.component";
import { PoetryComponent } from "./poetry/poetry.component";
import { SignAndSendEventsComponent } from "./sign-and-send-events/sign-and-send-events.component";
import { HalloweenGreetingsComponent } from "./halloween/halloween-greetings/halloween-greetings.component";
import { HalloweenComponent } from "./halloween/halloween.component";
import { ECardsPageComponent } from "./e-cards-page/e-cards-page.component";
import { SpecialtyCardsPageComponent } from "./specialty-cards-page/specialty-cards-page.component";
import { SignAndSendCardsComponent } from "./sign-and-send-cards/sign-and-send-cards.component";
import { CartsComponent } from "./carts/carts.component";
import { SignAndSendComponent } from "./order/sign-and-send/sign-and-send.component";
import { FathersDayComponent } from "./fathers-day/fathers-day.component";
import { MotherGiftsComponent } from "./mothers-day/mother-gifts/mother-gifts.component";
import { MotherCardsComponent } from "./mothers-day/mother-cards/mother-cards.component";
import { MothersDayComponent } from "./mothers-day/mothers-day.component";
import { StickersComponent } from "./stickers/stickers.component";
import { CreationsComponent } from "./creations/creations.component";
import { GiftsComponent } from "./gifts/gifts.component";
import { EventsComponent } from "./events/events.component";
import { HomeComponent } from "./home/home.component";
import { PageComponent } from "./page/page.component";
import { StatusComponent } from "./status/status.component";
import { OrderComponent } from "./order/order.component";
import { DetailComponent } from "./detail/detail.component";
import { CardsComponent } from "./cards/cards.component";
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TabsComponent } from "./pages/tabs/tabs.component";
import { ProfileComponent } from "./settings/profile/profile.component";
import { MotherGreetingsComponent } from "./mothers-day/mother-greetings/mother-greetings.component";
import { FatherGreetingsComponent } from "./fathers-day/father-greetings/father-greetings.component";
import { SignAndSendPageComponent } from "./sign-and-send-page/sign-and-send-page.component";
import { GraduationComponent } from "./graduation/graduation.component";
import { GraduationGreetingsComponent } from "./graduation/graduation-greetings/graduation-greetings.component";
import { JustBecauseComponent } from "./just-because/just-because.component";
import { JustBecauseGreetingsComponent } from "./just-because/just-because-greetings/just-because-greetings.component";
import { ChristmasComponent } from "./christmas/christmas.component";
import { ChristmasGreetingsComponent } from "./christmas/christmas-greetings/christmas-greetings.component";
import { NewyearComponent } from "./newyear/newyear.component";
import { NewyearGreetingsComponent } from "./newyear/newyear-greetings/newyear-greetings.component";
import { ValentinesComponent } from "./valentines/valentines.component";
import { ValentinesGreetingsComponent } from "./valentines/valentines-greetings/valentines-greetings.component";
import { ClipartComponent } from "./clipart/clipart.component";
import { CartConfirmComponent } from "./carts/cart-confirm/cart-confirm.component";
import { GamesComponent } from "./games/games.component";
import { HomeMobileComponent } from "./home-mobile/home-mobile.component";
import { Platform } from "@ionic/angular";
import { EventsMobileComponent } from "./events-mobile/events-mobile.component";
import { CreationsMobileComponent } from "./creations-mobile/creations-mobile.component";
import { StickersMobileComponent } from "./stickers-mobile/stickers-mobile.component";
import { StickersCardsMobileComponent } from "./stickers-cards-mobile/stickers-cards-mobile.component";
import { SignAndSendMobileComponent } from "./sign-and-send-mobile/sign-and-send-mobile.component";

const webRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "FibeiGreetings",
  },
  {
    path: "home",
    component: HomeComponent,
    title: "FibeiGreetings Homepage",
  },
  {
    path: "mother",
    component: MothersDayComponent,
    title: "FibeiGreetings MothersDay",
  },
  {
    path: "mother/cards",
    component: MotherCardsComponent,
    title: "FibeiGreetings MothersDay Card",
  },
  {
    path: "mother/gifts",
    component: MotherGiftsComponent,
    title: "FibeiGreetings MothersDay Gifts",
  },
  {
    path: "mother/greetings",
    component: MotherGreetingsComponent,
    title: "FibeiGreetings MothersDay Greetings",
  },
  {
    path: "father",
    component: FathersDayComponent,
    title: "FibeiGreetings FathersDay",
  },
  {
    path: "father/greetings",
    component: FatherGreetingsComponent,
    title: "FibeiGreetings FathersDay Greetings",
  },
  {
    path: "tabs",
    component: TabsComponent,
    title: "FibeiGreetings",
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    title: "FibeiGreetings User Profile",
  },
  {
    path: "events",
    component: EventsComponent,
    title: "FibeiGreetings Events",
  },
  {
    path: "gifts",
    component: GiftsComponent,
    title: "FibeiGreetings Gifts",
  },
  {
    path: "creations",
    component: CreationsComponent,
    title: "FibeiGreetings Creations",
  },
  {
    path: "stickers",
    component: StickersComponent,
    title: "FibeiGreetings Stickers",
  },
  {
    path: "stickercards",
    component: StickersCardsComponent,
    title: "FibeiGreetings Stickercards",
  },
  {
    path: "stickercards/:id",
    component: StickersCardsComponent,
    title: "FibeiGreetings Stickercards",
  },
  {
    path: "signandsend",
    component: SignAndSendEventsComponent,
    title: "FibeiGreetings Sign & Send",
  },
  {
    path: "signandsendcards/:id",
    component: SignAndSendCardsComponent,
    title: "FibeiGreetings Sign & Send",
  },
  {
    path: "cards/events/:event",
    component: CardsComponent,
    title: "FibeiGreetings Cards",
  },
  {
    path: "cards/events/:event/:recipient",
    component: CardsComponent,
    title: "FibeiGreetings Cards",
  },
  {
    path: "cards/event/:id",
    component: CardsComponent,
    title: "FibeiGreetings Cards",
  },
  {
    path: "cards/event/:id/:recipient",
    component: CardsComponent,
    title: "FibeiGreetings Cards",
  },
  {
    path: "search/:search",
    component: CardsComponent,
    title: "Fibei Greetings Search",
  },
  {
    path: "e-cards/events/:id",
    component: CardsComponent,
    title: "FibeiGreetings e-Card",
  },
  {
    path: "card/:id",
    component: DetailComponent,
    title: "FibeiGreetings Card",
  },
  {
    path: "order/:id",
    component: OrderComponent,
    title: "FibeiGreetings Order",
  },
  {
    path: "order/:id/:orderid",
    component: OrderComponent,
    title: "FibeiGreetings Order",
  },
  {
    path: "ecardorder/:id",
    component: ECardOrderComponent,
    title: "FibeiGreetings e-Card Order",
  },
  {
    path: "signandsend/:id",
    component: SignAndSendComponent,
    title: "FibeiGreetings Sign & Send",
  },
  {
    path: "status/:id",
    component: StatusComponent,
    title: "FibeiGreetings Status",
  },
  {
    path: "page/:id",
    component: PageComponent,
    title: "Fibei Greetings Page",
  },
  {
    path: "login",
    component: LoginComponent,
    title: "FibeiGreetings Login",
  },
  {
    path: "cart",
    component: CartsComponent,
    title: "FibeiGreetings Cart",
  },
  {
    path: "confirm/:id",
    component: CartConfirmComponent,
    title: "FibeiGreetings Cart",
  },
  {
    path: "signandsendpage",
    component: SignAndSendPageComponent,
    title: "FibeiGreetings Sign & Send Page",
  },
  {
    path: "graduation",
    component: GraduationComponent,
    title: "FibeiGreetings Graduation",
  },
  {
    path: "graduation/greetings",
    component: GraduationGreetingsComponent,
    title: "FibeiGreetings Graduation Greetings",
  },
  {
    path: "justbecause",
    component: JustBecauseComponent,
    title: "FibeiGreetings Just Because",
  },
  {
    path: "justbecause/greetings",
    component: JustBecauseGreetingsComponent,
    title: "FibeiGreetings Just Because Greetings",
  },
  {
    path: "specialtycardpage",
    component: SpecialtyCardsPageComponent,
    title: "FibeiGreetings Specialty",
  },
  {
    path: "ecardspage",
    component: ECardsPageComponent,
    title: "FibeiGreetings e-Cards Page",
  },
  {
    path: "halloween",
    component: HalloweenComponent,
    title: "FibeiGreetings Halloween",
  },
  {
    path: "halloween/greetings",
    component: HalloweenGreetingsComponent,
    title: "FibeiGreetings Halloween Greetings",
  },
  {
    path: "christmas",
    component: ChristmasComponent,
    title: "FibeiGreetings Christmas",
  },
  {
    path: "christmas/greetings",
    component: ChristmasGreetingsComponent,
    title: "FibeiGreetings Christmas Greetings",
  },
  {
    path: "poetry",
    component: PoetryComponent,
    title: "FibeiGreetings Poetry",
  },
  {
    path: "cliparts",
    component: ClipartComponent,
    title: "FibeiGreetings Clipart",
  },
  {
    path: "poetrycards/:id",
    component: PoetryCardsComponent,
    title: "FibeiGreetings Poetry",
  },
  {
    path: "newyear",
    component: NewyearComponent,
    title: "FibeiGreetings New Year",
  },
  {
    path: "newyear/greetings",
    component: NewyearGreetingsComponent,
    title: "FibeiGreetings New Year Greetings",
  },
  {
    path: "valentines",
    component: ValentinesComponent,
    title: "FibeiGreetings Valentines",
  },
  {
    path: "valentines/greetings",
    component: ValentinesGreetingsComponent,
    title: "FibeiGreetings Valentines Greetings",
  },
  {
    path: "postcards",
    component: PostcardsComponent,
    title: "FibeiGreetings Postcards",
  },
  {
    path: "e-cards",
    component: ECardsPageComponent,
    title: "FibeiGreetings E-Cards",
  },
  {
    path: "samples",
    component: SampleComponent,
    title: "FibeiGreetings Samples",
  },
  {
    path: "player/:id",
    component: SamplePlayerComponent,
    title: "FibeiGreetings",
  },
  {
    path: "play/:id",
    component: PlayComponent,
    title: "FibeiGreetings",
  },
  {
    path: "playtrack/:id",
    component: PlayComponent,
    title: "FibeiGreetings",
  },
  {
    path: "email/:type/:id",
    component: EmailMessageComponent,
    title: "FibeiGreetings",
  },
  {
    path: "games",
    component: GamesComponent,
    title: "FibeiGreetings Games",
  },
];

const mobileRoutes: Routes = [
  {
    path: "",
    component: HomeMobileComponent,
    title: "FibeiGreetings",
  },
  {
    path: "home",
    component: HomeMobileComponent,
    title: "FibeiGreetings Homepage",
  },
  {
    path: "events",
    component: EventsMobileComponent,
    title: "FibeiGreetings Events",
  },
  {
    path: "creations",
    component: CreationsMobileComponent,
    title: "FibeiGreetings Creations",
  },
  {
    path: "stickers",
    component: StickersMobileComponent,
    title: "FibeiGreetings Stickers",
  },
  {
    path: "stickercards",
    component: StickersCardsMobileComponent,
    title: "FibeiGreetings Stickers Cards",
  },
  {
    path: "signandsend",
    component: SignAndSendMobileComponent,
    title: "FibeiGreetings Sign & Send",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(webRoutes, { scrollPositionRestoration: "top" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(platform: Platform, router: Router) {
    let isMobile: boolean =
      platform.is("capacitor") || platform.is("mobileweb");

    console.log("isMobile", isMobile);
    if (isMobile) router.resetConfig(mobileRoutes);
  }
}
