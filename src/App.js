import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//TensorflowJS
import * as tf from '@tensorflow/tfjs';


class App extends Component {

  render() {


//hier erstellen wir ein model und übergeben es tf.sequential
//bedeutet der Output von einem Layer ist gleichzeitig der Input für den nächsten Layer
//es ist ein einfacher Stapel von Ebenen ohne Verzweigung 
const model = tf.sequential();

//hier fügen wird dem model einen dense layer hinzu, 
//bedeutet alle Knoten und jede der Schichten sind miteinander verbunden.
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// nachdem das Model definiert ist muss man es compilen
//hier  werden die Parameter spezifiziert, in diesem Beispiel mit der loss Funktion und der 
//Optimizer Funktion
model.compile({

      loss: 'meanSquaredError',
      optimizer: 'sgd'

});
 
async function learnLinear() {

  // um das Model zu trainieren, erschaffen wir zwei Tensors Werte eins für x und eins für y
//der erste Wert für xs ist ein Array, der zweite Werte od. auch Parameter genannt definiert die Form des Arrays
//in diesem Beispeil sind es 6 Zeilen eine Spalte
const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
//das gleiche für die ys Konstante
const ys = tf.tensor2d([-3, -1, 1, -2, -3, -4], [6, 1]);

//hier wird das Modell für eine feste Anzahl von Iterationen trainiert
//mit der fit Methode xs für den Input und ys für den Output und epochs setzt die Anzahl der jeweiligen iterationen fest.
await model.fit(xs, ys, {epochs: 250});

//hier übergebe ich dem paragraph Element im HTML Tag der Seite über die ID den Wert des tensors
document.getElementById('output_field').innerHTML = 
model.predict(tf.tensor2d([20], [1, 1]));

//Wichtig, die Berechnung dauert ein wenig, also nicht ertwarten, 
//dann wenn man auf dem Button klickt dass man sofort ein Ergebniss sieht  

}



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p id="output_field"></p>

        <button onClick={ () => { learnLinear() } }>Starte Dein erstes Neuronales Netzwerk</button>
      </div>
    );
  }
}

export default App;
