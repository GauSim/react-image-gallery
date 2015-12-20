/// <reference path="../typings/tsd.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'underscore';

import { Gallery, GalleryItem } from './Gallery';


const ListOfImages = [
  { img: 'https://c2.staticflickr.com/8/7494/16198306535_2c10003f20_b.jpg', cat: { name: 'Category 1', key: 'cat1' } },
  { img: 'https://c1.staticflickr.com/9/8572/16011541288_2815f8c8aa_b.jpg', cat: { name: 'Category 2', key: 'cat2' } },
  { img: 'https://c1.staticflickr.com/9/8610/16197119631_c4c5db717e_b.jpg', cat: { name: 'Category 3', key: 'cat3' } },
  { img: 'https://c1.staticflickr.com/9/8585/16197611041_35b63295dc_b.jpg', cat: { name: 'Category 4', key: 'cat4' } },
  { img: 'https://c2.staticflickr.com/8/7512/16203709715_c633652bba_b.jpg', cat: { name: 'Category 5', key: 'cat5' } },
  { img: 'https://c2.staticflickr.com/8/7578/16009188387_0756885de1_b.jpg', cat: { name: 'Category 6', key: 'cat6' } },
  { img: 'https://c2.staticflickr.com/8/7483/16007710030_9c541d5a84_b.jpg', cat: { name: 'Category 7', key: 'cat7' } },
  { img: 'https://c2.staticflickr.com/8/7464/16193349671_33d2c07ed4_b.jpg', cat: { name: 'Category 8', key: 'cat8' } },
  { img: 'https://c2.staticflickr.com/8/7542/16007929760_8ee9d7cac4_b.jpg', cat: { name: 'Category 9', key: 'cat9' } }
]


const ListOfProject = [];
for (let i = 0; i < 200; i++) {

  const randomImage = _.sample<{ img: string, cat: { name: string, key: string } }>(ListOfImages, 1)[0]

  // + '?v=' + i
  ListOfProject.push(
    new GalleryItem('Project ' + i, randomImage.img, randomImage.img, randomImage.cat)
  )
}


ReactDOM.render(
  <div> <Gallery items={ ListOfProject }/> </div>,
  document.getElementById('main-render')
);
