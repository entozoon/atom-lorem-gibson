'use babel';

var path = require('path'),
  gibsonString =
    "nodality,nodal point,jeans,Kowloon,Shibuya,digital,hacker,post-,futurity,papier-mache,rifle,otaku,pistol,modem,uplink,ablative,semiotics,free-market,narrative,pre-,meta-,marketing,8-bit,cyber-,electro-,meta-,cardboard,bicycle,range-rover,city,network,realism,euro-pop,j-pop,Chiba,Tokyo,San Francisco,franchise,sprawl,urban,decay,monofilament,katana,tanto,math-,bomb,grenade,tiger-team,3D-printed,plastic,carbon,nano-,tube,geodesic,dome,construct,A.I.,media,drone,sentient,dolphin,neural,artisanal,beef noodles,wonton soup,hotdog,DIY,Legba,systema,systemic,military-grade,denim,saturation point,order-flow,soul-delay,long-chain hydrocarbons,assault,sensory,stimulate,sub-orbital,BASE jump,youtube,footage,paranoid,apophenia,spook,industrial grade,silent,engine,RAF,wristwatch,shoes,faded,concrete,singularity,stellar,system,galaxy,warp,kanji,refrigerator,computer,render-farm,bridge,disposable,assassin,camera,garage,warehouse,fluidity,towards,into,motion,claymore,face forwards,rebar,advert,dead,tank-traps,neon,convenience store,man,woman,boy,girl,augmented reality,savant,weathered,corrupted,film,rain,vehicle,cartel,smart-,corporation,car,sign,receding,lights,physical,numinous,table,sunglasses,gauntlet,watch,screen,jacket,courier,office,pen,boat,tower,skyscraper,shrine,vinyl,chrome,market,shanty town,tattoo,human,gang,crypto-,dissident,AI,Aleph,arcology,BAMA,biochips,biochip personality,Biosoft,Blue Nine,Bosozoku,Chatsubo,Chiba City,coffin,Cornell,Joseph (1902-1973),count zero interrupt,cyberspace,derm/dermadisk,dermatrodes,Dex,EMP,Fletcher,Freeside,gentlemen loser,geodesics,holoprojector,House of the Blue Lights,ICE,ice,black,icebreaker,Kuang Grade Mark Eleven,Korsakov's,Lado-Acheson,Loa,Maas Biolabs,macroform node,matrix,Metro Holografix,mimetic polycarbon suits,Mole IX,Mycotoxin,new yen,neurosurgery,Night City,Ninsei,Ono-Sendai,People of Importance,personality,memory,bytes,RAM,ROM construct,projects,sense/net,simstim deck,SIN,sprawl,suit,temperfoam,Tessier-Ashpool,Turing Registry,Villa Straylight,When It Changed,yiheyuan filters,zion,cluster",
  gibson = gibsonString.split(',');

import { CompositeDisposable, Disposable } from 'atom';

module.exports = {
  disposables: null,
  inTheThrowsOfPassion: false, // in the midst of a flurry of keyboard shortcut presses
  outputText() {
    let editor;

    if ((editor = atom.workspace.getActiveTextEditor())) {
      let ext = path.extname(editor.getPath()).toLowerCase(),
        wordsAverage = 14,
        wordsDeviance = 8,
        string = this.inTheThrowsOfPassion ? '' : 'Lorem gibson ';
      wordCount = wordsAverage + Math.round(Math.random() * wordsDeviance * 2 - wordsDeviance);

      for (i = 0; i < wordCount; i++) {
        gibsonIndex = Math.round(Math.random() * (gibson.length - 1));
        string += gibson[gibsonIndex];
        if (i !== wordCount - 1) {
          // Add a space to the end of the word if it doesn't end with a hyphen
          if (string[string.length - 1] !== '-') {
            string += ' ';
          }
        } else {
          // Add a full stop to the end of the sentence, unless a hyphen in which case, swap it for a full stop
          if (string[string.length - 1] === '-') {
            string[string.length - 1] = '.';
          } else {
            string += '.';
          }
        }
      }

      // Make sure the first letter is capitalised
      string = string[0].toUpperCase() + string.slice(1);

      // If hammering for more sentences, prepend with a space after the previous full stop
      string = (this.inTheThrowsOfPassion ? ' ' : '') + string;
      this.inTheThrowsOfPassion = true;
      return editor.insertText(string);
    } else {
      return alert('Lorem Gibson only works in a text editor.');
    }
  },
  activate() {
    this.disposables = new CompositeDisposable();

    // Add event listener function with built-in dispose
    const addEventListener = function addEventListener(editor, eventName, handler) {
      var editorView = atom.views.getView(editor);
      editorView.addEventListener(eventName, handler);
      return new Disposable(function() {
        return editor.removeEventListener(eventName, handler);
      });
    };

    // Add keyup listener
    this.disposables.add(
      addEventListener(atom.workspace.getActiveTextEditor(), 'keyup', event => {
        if (event.key == 'Control') {
          this.inTheThrowsOfPassion = false;
        }
      })
    );

    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'lorem-gibson:sentence': () => {
          this.sentence();
        }
      })
    );
  },
  deactivate() {
    this.disposables.dispose();
  },
  sentence() {
    this.outputText();
  }
};
