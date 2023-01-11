/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import {
  IonApp,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ellipse, square, triangle } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'
import { Tab1, Tab2, Tab3 } from 'src/components/Tabs'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="text-indigo-700">Header Toolbar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/resume">
            <Tab1 />
          </Route>
          <Route exact path="/templates">
            <Tab2 />
          </Route>
          <Route path="/analytics">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/resume" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="resume" href="/resume">
            <IonIcon icon={triangle} />
            <IonLabel>Resume</IonLabel>
          </IonTabButton>
          <IonTabButton tab="templates" href="/templates">
            <IonIcon icon={ellipse} />
            <IonLabel>Templates</IonLabel>
          </IonTabButton>
          <IonTabButton tab="analytics" href="/analytics">
            <IonIcon icon={square} />
            <IonLabel>Analytics</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
