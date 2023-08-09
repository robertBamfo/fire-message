/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
sendBtn.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event){
    //stop the form from refreshing
    event.preventDefault();

    //store the data into a temp object
    const data = {
        USERNAME: usernameElem.value,
        MESSAGE: messageElem.value
    };

    //writing to the database
    database.push(data);

    //reset the value of message element
    messageElem.value = "";
}
/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on("child_added", addMessageToBoard);
/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData){
    //get the object passed from the firebase
    const data = rowData.val();
    console.log(data);

    let singleMessage = makeSingleMessageHTML(data.USERNAME, data.MESSAGE);

    allMessages.append(singleMessage);
}
/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt){
    let parentDiv = document.createElement("div");
    // adding a class 'single-message' to parentDiv
    parentDiv.classList.add('single-messsage');

    // creating a p element
    let usernameP = document.createElement("p");
    //adding a class 'single element'
    usernameP.classList.add('single-message-username');
    usernameP.innerHTML = usernameTxt + ":";
    //append username to div
    parentDiv.append(usernameP);

    // create another p element
    let messageP = document.createElement("p");
    messageP.innerHTML = messageTxt;
    parentDiv.append(messageP);
    return parentDiv;

}
/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */