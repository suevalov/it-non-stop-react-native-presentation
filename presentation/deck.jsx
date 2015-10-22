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
  me: require('./images/me.png')
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


// <Slide bgColor="primary" textColor="darkPrimary">
//     <Heading size={4} textColor="darkPrimary">
//         The different aspects of JavaScript
//     </Heading>
//     <div style={{height: '40px'}}></div>
//     <List>
//         <ListItem>Front-end development</ListItem>
//         <ListItem>Command line interface (CLI) applications</ListItem>
//         <ListItem>Desktop (GUI) applications</ListItem>
//         <ListItem>Mobile applications</ListItem>
//         <ListItem>Back-end development</ListItem>
//         <ListItem>IoT</ListItem>
//         <ListItem>Any combination of the above</ListItem>
//     </List>
// </Slide>
// <Slide bgColor="primary" textColor="darkPrimary">
//     <Heading size={4} textColor="darkPrimary">
//         The different aspects of JavaScript
//     </Heading>
//     <div style={{height: '40px'}}></div>
//     <List>
//         <ListItem>Front-end development</ListItem>
//         <ListItem>Command line interface (CLI) applications</ListItem>
//         <ListItem><strong>Desktop (GUI) applications</strong></ListItem>
//         <ListItem>Mobile applications</ListItem>
//         <ListItem>Back-end development</ListItem>
//         <ListItem>IoT</ListItem>
//         <ListItem>Any combination of the above</ListItem>
//     </List>
// </Slide>
// <Slide bgColor="primary">
//     <Image src={images.distribution.replace('/', '')} width="90%" />
// </Slide>
// <Slide bgColor="primary">
//     <Layout>
//         <Fill>
//             <div style={{'marginTop': '130px'}}>
//                 <Rectangle>
//                     Shared code
//                 </Rectangle>
//             </div>
//         </Fill>
//         <Fill>
//             <Rectangle>
//                 Desktop code
//             </Rectangle>
//             <Rectangle>
//                 Web code
//             </Rectangle>
//         </Fill>
//     </Layout>
// </Slide>
// <Slide bgColor="primary">
//     <Layout>
//         <Fill>
//             <Image src={images.logo.replace('/', '')} width="200px" />
//             <a href="http://electron.atom.io" target="_blank">
//                 <Text textColor="darkPrimary">Electron.js</Text>
//             </a>
//         </Fill>
//         <Fill>
//             <Image src={images.nwLogo.replace('/', '')} width="200px" />
//             <a href="http://nwjs.io/" target="_blank">
//                 <Text textColor="darkPrimary">NW.js</Text>
//             </a>
//         </Fill>
//     </Layout>
//     <a href='https://github.com/atom/electron/blob/master/docs/development/atom-shell-vs-node-webkit.md' target='_blank' style={{ 'fontSize': '10px', 'marginTop': '100px', 'display': 'block'}}>
//         <Text textColor='darkPrimary'>Electron's tech differences to NW.js</Text>
//     </a>
//
// </Slide>
// <Slide bgColor='white'>
//     <Heading size={4} textColor='darkPrimary'>Notable applications</Heading>
//     <Image src={images.electronApps.replace('/', '')} />
//     <a href='https://github.com/nwjs/nw.js/wiki/List-of-apps-and-companies-using-nw.js' target='_blank' style={{ 'fontSize': '10px', 'marginTop': '100px', 'display': 'block'}}>
//         <Text textColor='darkPrimary'>NW.js apps list</Text>
//     </a>
//     <a href='https://github.com/sindresorhus/awesome-electron' target='_blank' style={{ 'fontSize': '10px', 'marginTop': '10px', 'display': 'block'}}>
//         <Text textColor='darkPrimary'>Electron apps list</Text>
//     </a>
// </Slide>
// <Slide bgColor='black'>
//     <Heading textColor='primary' size={4}>A 10,000 foot view of Electron</Heading>
//     <Image src={images.appStructure.replace('/', '')} height='500px'/>
// </Slide>
// <Slide bgColor='black'>
//     <Image src={images.mainProcess.replace('/', '')} height='500px'/>
// </Slide>
// <Slide bgColor='primary'>
//     <Heading textColor='darkPrimary' size={4}>Let's create Hello world app!</Heading>
//   <CodePane
//     lang='javascript'
//     source={require('raw!./code/package.json.example')}
//     margin='100px 20px 20px 20px' />
// </Slide>
// <Slide bgColor='primary'>
//     <CodePane
//     lang='html'
//     source={require('raw!./code/index.html.example')} />
// </Slide>
// <Slide bgColor='primary'>
//     <CodePane
//     lang='javascript'
//     source={require('raw!./code/main.example')} />
// </Slide>
// <Slide bgColor='primary'>
//     <Heading textColor='darkPrimary' size={4}>Our Hello World!</Heading>
//     <Image src={images.runHelloWorld.replace('/', '')} width="100%" />
// </Slide>
// <Slide bgColor='primary'>
//     <Heading textColor='darkPrimary' size={4}>How to create desktop from web?</Heading>
//     <CodePane lang='css' source={require('raw!./code/convert-app.css.example')} margin='80px 0px 0px 0px' />
// </Slide>
// <Slide bgColor='white'>
//     <Heading textColor='darkPrimary' size={4}>Inter-Process Communication</Heading>
//     <Image src={images.subscribeSchema.replace('/', '')} width="100%" />
// </Slide>
// <Slide bgColor='primary'>
//     <Heading textColor='darkPrimary' size={4}>Inter-Process Communication</Heading>
//     <CodePane lang='javascript' source={require('raw!./code/ipc.example')} margin='80px 0px 0px 0px' />
// </Slide>
// <Slide bgColor='primary'>
//     <Heading textColor='darkPrimary' size={4}>Electron Modules</Heading>
//     <Image src={images.modules.replace('/', '')} width="100%" />
// </Slide>
// <Slide bgColor='primary' textColor='darkPrimary'>
//     <Heading size={4} textColor='darkPrimary'>
//         Packaging
//     </Heading>
//     <CodePane lang='bash' source={require('raw!./code/packaging.example')} margin='50px 0px 40px 0px' />
//     <List>
//         <ListItem>location of project</ListItem>
//         <ListItem>name of project</ListItem>
//         <ListItem>which platforms to build</ListItem>
//         <ListItem>architectures to build</ListItem>
//         <ListItem>Electron version to use</ListItem>
//     </List>
// </Slide>
// <Slide bgColor='primary' textColor='darkPrimary'>
//     <Heading size={4} textColor='darkPrimary'>
//         Diving deeper into Electron
//     </Heading>
//     <div style={{ 'marginTop': '60px' }}>
//         <a href="https://github.com/atom/electron/tree/master/docs/api" style={{ 'fontSize': '15px'}}>
//             <Text textColor='darkPrimary'>Check out the Electron API docs</Text>
//         </a>
//         <a href="https://github.com/sindresorhus/awesome-electron" style={{ 'fontSize': '15px' }}>
//             <Text textColor='darkPrimary'>Awesome Electron</Text>
//         </a>
//         <a href="https://www.npmjs.com/" style={{ 'fontSize': '15px' }}>
//             <Text textColor='darkPrimary'>npmjs.org</Text>
//         </a>
//     </div>
// </Slide>
// <Slide bgImage={images.thanks.replace('/', '')} bgDarken={0.6}>
//     <div className='thanksSlide'>
//       <Heading size={4} caps textColor='primary'>Thanks</Heading>
//       <div className='thanksSlide__links'>
//         <a href="http://suevalov.com/" target="__blank">Alexander Suevalov</a>
//         <a href="mailto:suevalov.me@gmail.com">suevalov.me@gmail.com</a>
//         <a href="https://github.com/suevalov" target="__blank" className="github">http://github.com/suevalov</a>
//         <a href="https://twitter.com/Suevalov" target="__blank" className="twitter">http://twitter.com/Suevalov</a>
//       </div>
//     </div>
// </Slide>
