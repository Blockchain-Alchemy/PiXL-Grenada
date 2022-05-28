import { initPlasmicLoader } from "@plasmicapp/loader-react";
import LoadingBar from "components/LoadingBar";
import UnityComponent from "components/Unity";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "oYWp5DRpUvyyRAKjSJya8K",  // ID of a project you are using
      token: "7YBihX2saa1VwBJAg9fG8XumDQlOjO8Lydl0YbI2YQX1CqpTUW6P3JYq8oMqcsXhKlYyMBbEGDWlaTf23A"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')

PLASMIC.registerComponent(LoadingBar, {
  name: 'LoadingBar',
  props: {
    progression: 'number'
  }
});

PLASMIC.registerComponent(UnityComponent, {
  name: 'UnityComponent',
  props: {
      
  }
})