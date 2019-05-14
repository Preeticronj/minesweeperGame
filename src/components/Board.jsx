import React from "react"
import Button from "./Button";
import Timer from "./Timer"
import "./Layout/Layout.css";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 10,
            mines: 10,
            dataArray: []
        }
    };

    componentDidMount() {
        this.plantMines(this.state.width, this.state.height, this.state.mines)
    }

    multipleElements = () => {

        let elements = [];
        for (let i = 0; i < 100; i++) {
            elements.push(
                <div key={i}> element{i + 1} </div>)
        }
        return elements;
    }

    getKey = (key) => {
        let newKey;
        if (key > 9) {
            newKey = {
                firstKey: parseInt(key / 10),
                secondKey: key % 10
            }
        }
        else {
            newKey = {
                firstKey: 0,
                secondKey: key % 10
            }
        }
        let i = newKey.firstKey;
        let j = newKey.secondKey;
        return this.state.dataArray[i][j].neighbour

    }

    separateElement = () => {
        var separateElements = [];
        var multiElements = this.multipleElements();
        let buttonText = '';

        for (var i = 0; i < multiElements.length; i += 10) {
            var oneRow = [];
            oneRow.push(multiElements.slice(i, i + 10).map(item => {
                buttonText = this.getKey(item.key)
                return <div style={{ display: 'inline-block' }}><Button buttonText={buttonText} fun={() => { }} /></div>
            }))
            separateElements.push(oneRow.map(itm => { return <div>{itm}</div> }))
        }
        return separateElements;
    }

    getRandomNumber = (value) => {
        return Math.floor((Math.random() * value) + 0)
    }

    createEmptyArray = (height, width) => {
        let data = []
        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isEmpty: false,
                    gameStatus: ''
                }
            }

        }
        return data;
    }

    plantMines = (height, width, mines) => {
        let data = this.createEmptyArray(height, width);
        let randomx, randomy, minesPlanted = 0;
        while (minesPlanted < mines) {
            randomx = this.getRandomNumber(width);
            randomy = this.getRandomNumber(height);
            if (!(data[randomx][randomy].isMine)) {
                data[randomx][randomy].isMine = true
                data[randomx][randomy].neighbour = "*";
                minesPlanted++;
            }

        }
        data = this.getNeighbourValue(data, width, height)
        this.setState({
            dataArray: data

        }, () => {
            console.log("updatedData-->", this.state.dataArray)
        })

    }

    getNeighbourValue = (data, width, height) => {
        let updatedData = data;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (data[i][j].isMine !== true) {
                    let mine = 0;
                    const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
                        if (value.isMine) {
                            mine++
                        }

                    });
                    if (mine == 0) {
                        updatedData[i][j].isEmpty = true
                    }
                    updatedData[i][j].neighbour = mine
                }
            }
        }
        return (updatedData)
    }

    traverseBoard = (x, y, data) => {
        const item = [];
        if (x > 0) {
            item.push(data[x - 1][y])
        }
        if (x < this.state.height - 1) {
            item.push(data[x + 1][y])
        }
        if (y > 0) {
            item.push(data[x][y - 1])
        }
        if (y < this.state.width - 1) {
            item.push(data[x][y + 1]);
        }
        if (x > 0 && y > 0) {
            item.push(data[x - 1][y - 1]);
        }
        if (x > 0 && y < this.state.width - 1) {
            item.push(data[x - 1][y + 1]);
        }
        if (x < this.state.height - 1 && y < this.state.width - 1) {
            item.push(data[x + 1][y + 1]);
        }
        if (x < this.state.height - 1 && y > 0) {
            item.push(data[x + 1][y - 1]);
        }
        console.log("--->pg", item)
        return item
    }

    render() {
        if (!this.state.dataArray || this.state.dataArray.length < 1) {
            return (
                <div>
                    <p>Loading..</p>
                </div>
            )
        }
        else {
            return (
                <div class="game-board">
                    <Timer />
                    {this.separateElement()}
                </div>
            )
        }
    }
}
export default Board;