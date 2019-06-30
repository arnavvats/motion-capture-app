import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GlobalService} from './shared/services/global.service';
import { VideoInputComponent } from './shared/components/video-input/video-input.component';
import { VideoOutputComponent } from './shared/components/video-output/video-output.component';
import { GameComponent } from './shared/components/game/game.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoInputComponent,
    VideoOutputComponent,
    GameComponent,
    GamePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
