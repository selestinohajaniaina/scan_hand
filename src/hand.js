		var directionX , directionY ;

		let fingerLookupIndices = {
		  thumb: [0, 1, 2, 3, 4],
		  indexFinger: [0, 5, 6, 7, 8],
		  middleFinger: [0, 9, 10, 11, 12],
		  ringFinger: [0, 13, 14, 15, 16],
		  pinky: [0, 17, 18, 19, 20]
		};
		function drawPoint(y, x, text) {
		//   ctx.clearRect(0, 0, canvas.width, canvas.height);
		  ctx.beginPath();
		  ctx.arc(x, y, 5, 0, 2 * Math.PI);
		//   ctx.fillStyle =`#FF5733`;
		// ctx.font = 'bold 20px Verdana, Arial, serif';
		  ctx.fill();
		//   ctx.fillText(text, x, y);
		}

		function drawKeypoints(keypoints) {
			// console.log(keypoints);
		  const keypointsArray = keypoints;
		  afficherMessage(keypoints);
		  for (let i = 0; i < keypointsArray.length; i++) {
			const y = keypointsArray[i][0];
			const x = keypointsArray[i][1];
			const z = keypointsArray[i][2]
			drawPoint(x , y , i);

			// pointBox[i].position.x = (x/100)-2.5;
			// pointBox[i].position.y = (y/100)-2.5;
			// pointBox[i].position.z = z/100;

		}

		  const fingers = Object.keys(fingerLookupIndices);
		  for (let i = 0; i < fingers.length; i++) {
			const finger = fingers[i];
			const points = fingerLookupIndices[finger].map(idx => keypoints[idx]);
			drawPath(points, false);
		  }
		}

		function drawPath(points, closePath) {
		  const region = new Path2D();
		  region.moveTo(points[0][0], points[0][1]);
		  for (let i = 1; i < points.length; i++) {
			const point = points[i];
			// console.log(point[0],point[1]);
			region.lineTo(point[0], point[1]);
		  }

		  if (closePath) {
			region.closePath();
		  }
		  ctx.stroke(region);
		}
		let video = document.getElementById('videoElement');
		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');
		let ctxp = canvas.getContext('2d');
		let model;
		const setUpCamera = () => {
			if(navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({video: true})
					.then(function(stream) {
						video.srcObject = stream;
					})
					.catch(function(err) {
						console.log(err);
					});
			}
		}
		const detectHandPoses = async () => {
				const prediction = await model.estimateHands(video);
				// ctx.drawImage(video,0,0);
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				ctx.beginPath();
				ctx.fillStyle = "red";
				ctx.strokeStyle='yellow';
				ctx.lineWidth = '2';
				// console.log(prediction.length);
				prediction.forEach((pred) => {
					const result = pred.landmarks;
					const annotations = pred.annotations;
					drawKeypoints(result, annotations);
				});
		}
		setUpCamera();
		video.addEventListener("loadeddata", async () => {
			model = await handpose.load();
			setInterval(() => {
				detectHandPoses();
			},1);
		});



		// Fonction pour afficher "I love You" en fonction des points de la main
function afficherMessage(points) {
	ctxp.strokeStyle = 'lime';
    ctxp.strokeRect(canvas.width/3, canvas.height/3, canvas.width/3, canvas.height/3 );
	// console.clear();
	directionX = points[12][0];
	directionY = points[12][1];
	// console.log("resultat12: ",directionX); // -200 ou +200[12 anbony]
  }