        var canvas;
        var canvasContext;
        var ballX = 50;
        var ballY = 50
        var ballXSpeed = 10;
        var ballYSpeed = 10;
        var player1Score = 0;
        var player2Score = 0;

        var showWinScreen = false;
        var WINNING_SCORE = 3;

        var paddle1Y = 250;
        var paddle2Y = 250;
        const PADDLE_THICKNESS = 10;
        const PADDLE_HEIGHT = 100;

        function calculateMausePos(evt) {
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;

            return{
                x:mouseX,
                y:mouseY
            };
        }


        function handleMouseClick(evt){
            if(showWinScreen){
                player1Score = 0; 
                player2Score = 0;
                showWinScreen = false;
            }
        }

        window.onload = function(){
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        var framesPerSecond = 30;
        setInterval(function (){
            moveEverything();
            drawEverything();
        }, 1000/framesPerSecond);


        canvas.addEventListener('mousedown', handleMouseClick);


        canvas.addEventListener('mousemove', 
            function(evt) {
                var mousePos = calculateMausePos(evt);
                paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
            });

        }

        function resetBall(){
            if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
                showWinScreen = true;
            }

            ballXSpeed = -ballXSpeed;

            ballX = canvas.width/2;
            ballY = canvas.height/2;
        }

        function computerMovement(){
            var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
            if(paddle2YCenter < ballY-35){
                paddle2Y += 6;

            }
            else if (paddle2YCenter > ballY + 35){
                paddle2Y-=6;

            }
        }

        function moveEverything(){
            computerMovement();
            ballX = ballX + ballXSpeed;
            ballY = ballY + ballYSpeed;
            if(ballX < 0){
                if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
                    ballXSpeed = -ballXSpeed;

                    var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
                    ballYSpeed = deltaY * 0.35;
                }
                else{
                    player2Score++;
                    resetBall();
                    
                }
            }
            if(ballX > canvas.width){
                if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
                    ballXSpeed = -ballXSpeed;
                    var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
                    ballYSpeed = deltaY * 0.35;
                }
                else{
                    player1Score++;
                    resetBall();

                }
            }


            if(ballY < 0){
                ballYSpeed = -ballYSpeed;
            }
            if(ballY > canvas.height){
                ballYSpeed = -ballYSpeed;
            }
        }

        function drawNet(){
            for (var i = 0; i < canvas.height; i+=40) {
            colorRect(canvas.width/2-1,i,2,20, 'white');
                
            }
        }
    

        function drawEverything(){


            console.log('ballX');
            // 
            colorRect(0,0,canvas.width, canvas.height, 'black');

            if(showWinScreen){
                canvasContext.fillStyle = 'white';

                if(player1Score >= WINNING_SCORE ){
                    canvasContext.fillText('Left player wom!',canvas.width/2,200);
                    
                }else if(player2Score >= WINNING_SCORE){
                    canvasContext.fillText('Right player wom!',canvas.width/2,200);

                }


                canvasContext.fillText('click to continue',canvas.width/2,canvas.height/2);
                return;
            }

            drawNet();

            colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');

            colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y,
                PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');
            // circle
            drawCircle(ballX, ballY, 10, 'white');
            canvasContext.fillText("Score: " + player1Score, 100, 100);
            canvasContext.fillText("Score: " + player2Score, canvas.width - 150, 100);

        }

        function drawCircle(centerX, centerY, radius, drawColor){
            canvasContext.fillStyle = drawColor;
            canvasContext.beginPath();
            canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2,true);
            canvasContext.fill();
        }

        function colorRect(leftX,topY, width , height, color){
            canvasContext.fillStyle = color;
            canvasContext.fillRect(leftX,topY, width , height);
        }