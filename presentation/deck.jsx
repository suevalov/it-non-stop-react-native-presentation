import React from 'react/addons';
import * as Slides from './slides/index';
import {
  Deck, Slide
} from '../src/spectacle';

import preloader from '../src/utils/preloader';

const images = {
  splash: require('./images/splash.png'),
  thanks: require('./images/ironman-thanks.gif'),
  logo: require('./images/react-logo.png'),
  like: require('./images/like-icon.png'),
  nativeApps: require('./images/native-apps.png'),
  buildingNativeApps: require('./images/building-native-apps.jpeg'),
  me: require('./images/me.png'),
  phones: require('./images/ios-android.png'),
  webHero: require('./images/web-superhero.png'),
  splitBackground: require('./images/split-background.png'),
  htmlCssJS: require('./images/html-js-css.png')
};

preloader([images.splash, images.me, images.logo, images.thanks]);

const slides = [
  // Splash
  {
    slideProps: {
      bgColor: 'yellowTheme',
      bgImage: images.splash.replace('/', '')
    }
  },
  // Intro
  {
    component: Slides.Intro,
    slideProps: {
      bgColor: 'primary'
    },
    props: {
      logo: images.logo.replace('/', ''),
      photo: images.me.replace('/', '')
    }
  },
  // Why do we love native apps
  {
    component: Slides.WhyDoWeLoveNativeApps,
    slideProps: {
      bgColor: 'light',
    },
    props: {
      like: images.like.replace('/', '')
    }
  },
  // Native Apps Bullet
  {
    component: Slides.BulletLoveNativeApps,
    slideProps: {
      bgColor: 'light'
    },
    props: {
      image: images.nativeApps.replace('/', '')
    }
  },
  {
    component: Slides.BuildingNativeAppsIsHard,
    slideProps: {
      bgImage: images.buildingNativeApps.replace('/', ''),
      bgDarken: 0.7
    }
  },
  {
    component: Slides.BulletHardNativeApps,
    slideProps: {
      bgColor: 'light'
    },
    props: {
      image: images.phones.replace('/', '')
    }
  },
  {
    component: Slides.WebSolvesThisProblem,
    slideProps: {
      bgColor: 'darkPrimary'
    },
    props: {
      image: images.webHero.replace('/', '')
    }
  },
  {
    component: Slides.HowWebSolvedTheProblems,
    slideProps: {
      bgImage: images.splitBackground.replace('/', '')
    },
    props: {
      image: images.htmlCssJS.replace('/', '')
    }
  },
  {
    component: Slides.WebBrowser,
    slideProps: {
      bgColor: 'light'
    }
  },
  {
    component: Slides.UserExperinceOrDeveloperVelocity,
    slideProps: {
      bgColor: 'darkPrimary'
    }
  },
  {
    component: Slides.FinalSlide,
    slideProps: {
      bgImage: images.thanks.replace('/', ''),
      bgDarken: 0.6
    }
  }
];

export default class extends React.Component {

  renderSlides() {
    return slides.map((slide, index) => {
      if (slide.component) {
        return (
          <Slide {...slide.slideProps}>
            <slide.component {...slide.props} index={index} />
          </Slide>
        );
      }
      return <Slide {...slide.slideProps} />;
    });
  }

  render() {
    return (
      <Deck transition={['fade']} transitionDuration={800} progress='bar'>
        { this.renderSlides() }
      </Deck>
    );
  }
}
