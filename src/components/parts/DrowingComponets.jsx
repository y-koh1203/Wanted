import React from 'react'

const style = {
    width:300,
    height:200,
}

export default class DrawingArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            can: null,
            ct: null,
            mf: false,
            ox: 0,
            oy: 0,
            x: 0,
            y: 0,
        };
        
        this.clearCanvas = this.clearCanvas.bind(this);
        
        this.onDown = this.onDown.bind(this);
        this.onUp = this.onUp.bind(this);
        this.onMove = this.onMove.bind(this);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.drawLine = this.drawLine.bind(this);
    }

    componentDidMount(){
        let can = this.state.can;
        let ct = this.state.ct;

        can=document.getElementById("can");
        
        ct=can.getContext("2d");
        
        ct.strokeStyle="#000000";
        ct.lineWidth=5;
        ct.lineJoin="round";
        ct.lineCap="round";

        ct.fillStyle="rgb(255,255,255)";
        ct.fillRect(0,0,can.getBoundingClientRect().width,can.getBoundingClientRect().height);

        this.setState({
            can:can,
            ct:ct,
        })
    }

    clearCanvas(){
        let can = this.state.can;
        let ct = this.state.ct;

        ct.fillStyle="rgb(255,255,255)";
        ct.fillRect(0,0,can.getBoundingClientRect().width,can.getBoundingClientRect().height);
    }

    onDown(event){
        let ox;
        let oy;

        ox=event.touches[0].pageX-event.target.getBoundingClientRect().left;
        oy=event.touches[0].pageY-event.target.getBoundingClientRect().top;
        event.stopPropagation();

        this.setState({
            ox:ox,
            oy:oy,
            mf:true,
        });
    }

    onMove(event){
        if(this.state.mf){
            let x=event.touches[0].pageX-event.target.getBoundingClientRect().left;
            let y=event.touches[0].pageY-event.target.getBoundingClientRect().top;

            this.setState({
                x:x,
                y:y,
            });

            this.drawLine();
            
            let ox=x;
            let oy=y;

            this.setState({
                ox:x,
                oy:y,
            })
            
            //event.preventDefault();
            event.stopPropagation();
          }
    }

    onUp(event){
        event.stopPropagation();

        this.setState({
            mf:false,
        });
    }

    onMouseDown(event){
        let ox;
        let oy;
        
        ox=event.clientX-event.target.getBoundingClientRect().left;
        oy=event.clientY-event.target.getBoundingClientRect().top ;

        this.setState({
            ox:ox,
            oy:oy,
            mf:true,
        });
    }

    onMouseMove(){
        if(this.state.mf){
            x=event.clientX-event.target.getBoundingClientRect().left;
            y=event.clientY-event.target.getBoundingClientRect().top;

            this.setState({
                x:x,
                y:y,
            });

            this.drawLine();
            
            let ox=x;
            let oy=y;

            this.setState({
                ox:x,
                oy:y,
            })
            
            //event.preventDefault();
            event.stopPropagation();
        }
    }

    onMouseUp(){
        this.setState({
            mf:false,
        })
    }

    drawLine(){
        let ct = this.state.ct;
        let ox = this.state.ox;
        let oy = this.state.oy;
        let x = this.state.x;
        let y = this.state.y;

        ct.beginPath();
        ct.moveTo(ox,oy);
        ct.lineTo(x,y);
        ct.stroke();
    }

    render(){
        return(
            <div>
                <div id="candiv" style={style}>
                    <canvas id="can" onTouchStart={this.onDown.bind(this)} 
                        onTouchMove={this.onMove.bind(this)} onTouchEnd={this.onUp.bind(this)} onMouseDown={this.onMouseDown.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onMouseUp={this.onMouseUp.bind(this)} style={style}></canvas>
                </div> 
                <input type="button" onClick={this.clearCanvas.bind(this)} value="クリア" data-inline="true" />
            </div>        
        )
    }
}