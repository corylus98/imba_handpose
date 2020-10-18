console.time('execution time');
const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-core');
require('@tensorflow/tfjs-backend-cpu');
// require('@tensorflow/tfjs-node');

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

async function main(img) {
  console.time('load');
  const model = await handpose.load();

  console.timeEnd('load');
  console.time('predict');
  const predictions = await model.estimateHands(img);
  console.timeEnd('predict');
  console.log('length: ', predictions.length);
  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].landmarks;
      // Log hand keypoints.
      // for (let i = 0; i < keypoints.length; i++) {
      //   const [x, y, z] = keypoints[i];
      //   console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      // }
      console.log(predictions[0].annotations);
      console.timeEnd('execution time');
    }
  }
}

loadImage('/Users/yuchen/Desktop/hand2.png').then((image) => {
  ctx.drawImage(image, 0, 0, 200, 200)
})

main(canvas);