<img width="183" alt="Screen Shot 2023-07-17 at 2 28 00 AM" src="https://github.com/rollthecloudinc/solid/assets/73197190/d3a99616-f4be-4097-9fd8-566c80c1742a">

# SOLID Starter Kit

## Introduction

SOLIDS are completely independent small Angular applications that can be included at runtime into any Quell/Spearhead based application. Any SOLID can be added without modifying Quell/Spearhead core or host application that the SOLID will be used. This enables development of SOLIDs that extend Quell independent of the core platform itself. SOLID authors deploy SOLIDs on CDNs as small, independent Angular apps that are loaded remotely. Once published SOLIDs are added at runtime in the browser when building pages without changing any code or installing new software.

## SOLID Workflow

Onboarding workflow for dev to get up and running creating SOLIDs working specifically on extending core without needing to modify Quell core code, minimal understanding of core.

1. Running spearhead
1. SOLID Creation
1. SOLID Loading

### Running Spearhead

[spearhead](https://github.com/rollthecloudinc/spearhead) is the designated app starter kit for easily running Quell. Spearhead doesn’t maintain any Quell core libraries. Instead the latest releases are pulled down from GitHub as packages when installing the node packages using npm install. Spearhead is supped up Angular starter kit with all magic of Quell already wired up. Spearhead can be treated like any other Angular project once cloned.

### SOLID creation

Similar in nature to spearhead SOLID is the app starter kit fore extending Quell. A SOLID is any Webpack 5 micro frontend compatible with [module federation](https://webpack.js.org/concepts/module-federation/). Angular is the official framework of Quell therefore the SOLID starter kit is configured to work with Angular. In the future there will be SOLID starters for specific frameworks like solid-react, solid-vue, solid-ts, etc.

### SOLID Loading

SOLIDS are loaded into Quell at runtine. SOLIDS are loaded as a *context* into the [Quell editor](https://demo.druidcloud.io/pages/create-panel-page). Once a SOLID has been loaded all plugins within the SOLID become accessible from the the Quell shell / editor. In this way SOLIDs are not your typical micro frontend. SOLIDs don’t typically have a default ui. Instead they define plugin implantations which provides the piping needed to extend Quell core without ever touching code code.

<img width="1440" alt="Screen Shot 2023-06-15 at 4 11 53 AM" src="https://github.com/rollthecloudinc/quell-plugin/assets/73197190/fa6e348a-4b69-4f01-a31d-360c4ba616cd">

The context system is a pivotal part of Quell and loosely based on the [Drupal context system](https://www.drupal.org/project/context). More detail will be provided in future docs.

<img width="1440" alt="Screen Shot 2023-06-15 at 4 14 03 AM" src="https://github.com/rollthecloudinc/quell-plugin/assets/73197190/7a765f97-3730-4543-899a-3d795e605654">

## Examples

* https://demo.carbonfreed.app/tractorbeam-test-v3
* https://demo.carbonfreed.app/tractorbeam-test-v3/manage

<img width="245" alt="Screen Shot 2023-07-19 at 6 54 01 PM" src="https://github.com/rollthecloudinc/solid/assets/73197190/848ba6b8-8e90-4eb8-896a-91a02a13572c">


