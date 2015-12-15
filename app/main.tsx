/// <reference path="../typings/tsd.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'underscore';
import { Project, ProjectCategory } from './Models';
import { Gallery } from './Gallery';










const ListCategory = [
  { name: 'category 1', key: 'cat1' },
  { name: 'category 2', key: 'cat2' },
  { name: 'category 3', key: 'cat3' },
  { name: 'category 4', key: 'cat4' },
  { name: 'category 5', key: 'cat5' },
  { name: 'category 6', key: 'cat6' },
];

const ListOfImages = [
  'http://fachadasdecasamodernas.com/wp-content/uploads/2015/10/Hermosa-fachada-de-casa-modernas-1.jpg',
  'https://www.schwoererhaus.de/storage/images/830x466/3_preistraeger_830_466.jpg/%7Bscreen=medium%7D',
  'http://www.flow-architektur.de/wp-content/uploads/2011/05/2.jpg',
  'http://www.zerbes.biz/fotografie_innenarchitektur_7.jpg',
  'http://www.frankwollinger.de/referenzen/fotograf/innenarchitektur-fotografie_files/innenarchitektur-fotografie.jpg',
  'http://fotograf-stuemer.de/blog/wp-content/uploads/sps_spStuemer_Innenarchitektur_exemplarisch_01.jpg'
]
const ListOfProject = [];
for (let i = 0; i < 200; i++) {
  ListOfProject.push(new Project(
    'Project ' + i,
    //'http://lorempixel.com/400/200/?' + i,
    _.sample(ListOfImages, 1)[0] + '?v=' + i,
    'http://www.web.de',
    _.sample<ProjectCategory>(ListCategory, 1)[0])
  )
}


ReactDOM.render(
  <div> <Gallery ListOfProject={ ListOfProject }/> </div>,
  document.getElementById('main-render')
);
