(this.webpackJsonpchat=this.webpackJsonpchat||[]).push([[0],{36:function(e,t,s){},59:function(e,t,s){},60:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s.n(n),o=s(23),i=s.n(o),r=(s(36),s(11)),c=s(5),l=s(6),u=s(4),m=s(9),d=s(8),g=s(31),p=s(2),h=s.n(p),_=s(24),b=s.n(_),v=s(13),f=s(26),j=s(25);v.b.add(j.a,f.a);var x=Object(v.a)({prefix:"fab",iconName:"google"}).html;function y(e,t,s){var n=document.querySelector("#"+e),a=document.createElement("div");a.setAttribute("class","left_message_container");var o=document.createElement("h4");o.setAttribute("class","message_username"),o.setAttribute("align","center"),o.innerHTML='<span id="username">'+s+"</span>",h()(a).append(o),h()(a).append('<button id="google_search_button" class="google_search_button" value=\''.concat(t,"'\">").concat(x," Search on Google</button>"));var i=document.createElement("p");i.setAttribute("class","left_message"),i.innerText=t,h()(a).append(i),n.appendChild(a)}function O(e,t,s){var n=document.querySelector("#"+e),a=document.createElement("div");a.setAttribute("class","right_message_container");var o=document.createElement("h4");o.setAttribute("class","message_username"),o.setAttribute("align","center"),o.innerHTML='<span id="username">'+s+"</span>",h()(a).append(o),h()(a).append('<button id="google_search_button" class="google_search_button" value=\''.concat(t,"'\">").concat(x," Search on Google</button>"));var i=document.createElement("p");i.setAttribute("class","right_message"),i.innerText=t,h()(a).append(i),n.appendChild(a)}function w(e){var t=h()("<p id='copy_it'>");h()("body").append(t),t.val(h()(e).text()).select(),document.execCommand("copy")}var k=s(29),N=s(0),S=function(e){Object(m.a)(s,e);var t=Object(d.a)(s);function s(e){var n;return Object(c.a)(this,s),(n=t.call(this,e)).boxName=n.props.boxName,n}return Object(l.a)(s,[{key:"render",value:function(){var e,t=this;return"image_to_text_box"==this.boxName?e=Object(N.jsx)("div",{className:"image_to_text_box",children:Object(N.jsxs)("form",{id:"image_to_text_form",children:[Object(N.jsxs)("div",{children:[Object(N.jsx)("input",{className:"image_to_text_inputs",id:"convert_to_text",name:"convert_to_text",type:"checkbox"}),Object(N.jsx)("label",{htmlFor:"convert_to_text",children:"Convert To Text"})]}),Object(N.jsxs)("div",{children:[Object(N.jsx)("input",{className:"image_to_text_inputs",id:"direct_upload",name:"direct_upload",type:"checkbox"}),Object(N.jsx)("label",{htmlFor:"upload_direct",children:"Direct Upload"})]}),Object(N.jsxs)("div",{className:"image_to_text_description",children:[Object(N.jsx)("p",{children:"Image Description"}),Object(N.jsx)("textarea",{className:"image_to_text_textarea",id:"image_description",placeholder:"Enter Image Description here",cols:"50"})]}),Object(N.jsxs)("div",{children:[Object(N.jsx)("button",{id:"upload_button",className:"image_to_text_button",type:"submit",value:"upload",onClick:function(e){return t.props.handler(e,{button:"upload"})},children:"Upload"}),Object(N.jsx)("button",{id:"cancel_button",className:"image_to_text_button",type:"submit",value:"cancel",onClick:function(e){return t.props.handler(e,{button:"cancel"})},children:"Cancel"})]})]})}):"progress_box"==this.boxName?e=Object(N.jsxs)("div",{className:"progress_box",children:[Object(N.jsxs)("h2",{id:"progress_box_heading",align:"center",children:["Converting Image To Text (",this.props.progress+"%",")"]}),Object(N.jsx)("div",{className:"progress_line",style:{width:this.props.progress+"%"}})]}):"logout_box"==this.boxName&&(e=Object(N.jsx)("div",{className:"logout_box",children:Object(N.jsx)("button",{id:"logout_button",onClick:this.props.logoutHandler,children:"Logout"})})),Object(N.jsx)("div",{className:"custom_box",children:e})}}]),s}(n.Component),C=s(30);function q(){h()(".image_to_text_box").css({visibility:"hidden"})}var A=function(e){Object(m.a)(s,e);var t=Object(d.a)(s);function s(e){var n;return Object(c.a)(this,s),(n=t.call(this,e)).client=n.props.message_api.get_client(),n.username=n.props.message_api.get_username(),n.roomname=n.props.message_api.get_roomname(),n.state={connected:"",inputquestion:"",file:null,formData:null,progress:.01},n.onDrop=function(e){console.log(e),n.setState({file:e}),h()(".image_to_text_box").css({visibility:"visible"})},n.message_api=n.props.message_api,n.message_api.load_messages(),n.sendMessage=n.sendMessage.bind(Object(u.a)(n)),n.handle_upload_image=n.handle_upload_image.bind(Object(u.a)(n)),n.handle_clear_room_messages=n.handle_clear_room_messages.bind(Object(u.a)(n)),n.handle_update_progress=n.handle_update_progress.bind(Object(u.a)(n)),n.handle_go_to_last_message=n.handle_go_to_last_message.bind(Object(u.a)(n)),n.logoutHandler=n.logoutHandler.bind(Object(u.a)(n)),n}return Object(l.a)(s,[{key:"logoutHandler",value:function(e){localStorage.removeItem("username"),localStorage.removeItem("roomname"),window.location.reload()}},{key:"handle_go_to_last_message",value:function(e){var t=document.getElementById("questions_box");t.scrollTop=t.scrollHeight}},{key:"handle_update_progress",value:function(e){this.setState({progress:e})}},{key:"sendMessage",value:function(e){this.message_api.send_message_to_room("new_message",this.state.inputquestion),this.setState({inputquestion:""}),e.preventDefault()}},{key:"handle_clear_room_messages",value:function(e){var t=prompt("Enter Password : ");this.message_api.clear_room_messages(t)}},{key:"handle_upload_image",value:function(e,t){var s=!1,n=!1;if(h()("#convert_to_text").is(":checked")&&(s=!0),h()("#direct_upload").is(":checked")&&(n=!0),"upload"==t.button)if(s&&n)alert("You can't tick both");else if(s||n)if(n&&!s){var a=h()("#image_description").val();""!=a&&null!=a||(a=""),this.message_api.send_file_to_group(this.state.file,a),q()}else{q(),h()(".progress_box").css({visibility:"visible"});var o=this.handle_update_progress;this.message_api.send_image_text(this.state.file[0],(function(e){o(e)}))}else alert("Please Select Atleast One or Cancel");else q();e.preventDefault()}},{key:"componentDidMount",value:function(){var e=this;Notification?"granted"!=Notification.permission&&(Notification.requestPermission(),b.a.Permission.get()):alert("Desktop Notification not available in your browser"),function(e){for(var t=h()("."+e),s=1;s<=20;s++){var n=document.createElement("span");n.setAttribute("style","--i:".concat(s,";")),t.append(n)}}("loading"),h()(".loading").css({visibility:"visible"}),this.client.onopen=function(){var t,s,n;e.setState({connected:"Welcome, You are Connected With "+e.roomname}),console.log("connected to websocket"),t=e.client,s=e.username,n=e.roomname,t.send(JSON.stringify({command:"fetch_messages",username:s,roomname:n})),document.removeEventListener("copy",(function(){})),document.addEventListener("copy",(function(e){var t=h()("#copy_it").val();console.log(t),null!=e.clipboardData&&null!=t&&null!=e&&(e.clipboardData.setData("text/plain",t),e.preventDefault(),h()("#copy_it").remove())}))}}},{key:"render",value:function(){var e=this;return Object(N.jsxs)("div",{className:"QuestionsBox",children:[Object(N.jsx)(S,{boxName:"image_to_text_box",handler:this.handle_upload_image}),Object(N.jsx)(S,{boxName:"progress_box",progress:this.state.progress}),Object(N.jsx)(S,{boxName:"logout_box",logoutHandler:this.logoutHandler}),Object(N.jsxs)("div",{className:"question_box_header",children:[Object(N.jsx)(k.a,{onDrop:this.onDrop,accept:"image/*",children:function(e){var t=e.getRootProps,s=e.getInputProps,n=e.isDragActive,a=e.isDragReject;return Object(N.jsxs)("div",Object(r.a)(Object(r.a)({},t({className:"dropzone",id:"dropzone"})),{},{children:[Object(N.jsx)("input",Object(r.a)({},s())),!n&&"Click here or drop a file to upload!",n&&!a&&"Drop it like it's hot!",a&&"File type not accepted, sorry!"]}))}}),Object(N.jsx)("button",{id:"clear_message_button",onClick:this.handle_clear_room_messages,children:"Clear All Messages"})]}),Object(N.jsxs)("div",{id:"questions_box",className:"questions_box",children:[Object(N.jsx)("div",{className:"loading"}),Object(N.jsx)("div",{className:"down_arrow_button",onClick:this.handle_go_to_last_message,children:Object(N.jsx)(C.a,{color:"white",size:40})})]}),Object(N.jsxs)("div",{className:"question_input_container",children:[Object(N.jsx)("textarea",{id:"input_question",type:"text",onChange:function(t){e.setState({inputquestion:t.target.value})},value:this.state.inputquestion,placeholder:"Enter Your Question here"}),Object(N.jsx)("input",{id:"post_question_button",type:"submit",onClick:this.sendMessage,value:"POST"})]}),this.client.onmessage=function(t){var s=JSON.parse(t.data);if("messages"===s.type)h()(".loading").fadeOut("fast"),function(e,t,s,n){for(var a=0;a<t.length;a++){var o=t[a];n===o.roomname&&(o.username===s?O(e,o.message,o.username):y(e,o.message,o.username))}}("questions_box",s.messages,e.username,e.roomname),h()("#questions_box").css({"align-items":"initial","justify-content":"initial"});else if("message"===s.type){var n=s.message,a=n.username,o=n.roomname;document.hasFocus()||function(e,t,s){if("granted"!=Notification.permission)Notification.requestPermission();else{var n=new Notification("Awesome Chatroom:\n".concat(t,"<--").concat(e),{body:s,icon:"https://i.pinimg.com/originals/87/68/a6/8768a6b1df27243034f123988cfdb9d1.jpg"});n.onclick=function(){n.close(),window.parent.focus()}}}(a,o,n.message),a===e.username?O("questions_box",n.message,a):y("questions_box",n.message,a)}else if("exists"===s.type&&s.message.username===e.username)alert("This Question Already Exists You Can't Upload Same Again");else if("updated_message"===s.type){!function(e){if(e.error)alert("Message Not Found");else{var t,s=document.querySelector("#questions_box").getElementsByTagName("p"),n=e.answer,a=e.username,o=Object(g.a)(s);try{for(o.s();!(t=o.n()).done;){var i=t.value;if(String(i.innerText).trim()===String(e.message).trim()){var r=document.createElement("p");r.setAttribute("class","answer"),r.innerHTML='<span id="answered">'+a+" : "+n+"</span>",i.appendChild(r),i.style.backgroundColor="cyan"}}}catch(c){o.e(c)}finally{o.f()}}}(s.message)}else if("clear_room_message"==s.type)"true"==s.message.status?h()("#questions_box").empty():"false"==s.message.status&&alert(s.message.message);else if("new_file"===s.type){var i=s.message.dataURL,r=document.createElement("img");r.src=i,r.className="image_file",document.getElementById("questions_box").appendChild(r)}else"questions_list"===s.type&&function(e,t,s){for(var n=e.message,a="questions_box",o=0;o<n.length;o++)s===e.roomname&&(e.username===t?O(a,n[o],e.username):y(a,n[o],e.username))}(s,e.username,e.roomname);!function(e,t,s){h()(".right_message").unbind("contextmenu").bind("contextmenu",(function(e){return w(this),window.confirm("Copied Successfully"),!1})),h()(".left_message").unbind("contextmenu").bind("contextmenu",(function(e){return w(this),window.confirm("Copied Successfully"),!1})),h()(".right_message").unbind("click").bind("click",(function(){var n=prompt("Enter Answer : ");if(null!==n&&""!==n){var a=this.innerText,o=document.createElement("p");o.setAttribute("class",t+"_answer"),o.innerHTML='<span id="answered">'+t+" : "+n+"</span>",this.appendChild(o);var i=this.innerText;o.innerText="",o.remove(),e.send(JSON.stringify({command:"update_message",message:a,updated_message:i,answer:n,username:t,roomname:s}))}})),h()(".left_message").unbind("click").bind("click",(function(n){var a=prompt("Enter Answer : ");if(null!==a&&""!==a){var o=this.innerText,i=document.createElement("p");i.setAttribute("class",t+" answer"),i.innerHTML='<span id="answered">'+t+" : "+a+"</span>",this.appendChild(i);var r=this.innerText;i.innerText="",i.remove(),e.send(JSON.stringify({command:"update_message",message:o,updated_message:r,answer:a,username:t,roomname:s}))}})),h()(".google_search_button").unbind("click").bind("click",(function(e){var t="http://www.google.com/search?q="+e.target.value;window.open(t,"_blank")}))}(e.client,e.username,e.roomname)}]})}}]),s}(n.Component),E=s(28),T=s.n(E);var D=function(){function e(t){Object(c.a)(this,e),this.hostname=window.location.host,this.ws_protocol="https:"==window.location.protocol?"wss":"ws",this.api_url=window.location.protocol+"//"+this.hostname+"/",this.messages=[],this.client=t,this.username=null,this.roomname=null}return Object(l.a)(e,[{key:"load_messages",value:function(){var e=this;T.a.get(this.api_url+"api/messageapi/").then((function(t){var s=t.data;e.messages=s})).catch((function(e){console.log(e)}))}},{key:"send_file_to_group",value:function(e,t){var s=this.client,n=this.username,a=this.roomname;!function(e,t){var s=new FileReader;s.onload=function(){var e=s.result;t(e)},s.readAsDataURL(e[0])}(e,(function(e){s.send(JSON.stringify({command:"new_file",dataURL:e,description:t,username:n,roomname:a}))}))}},{key:"send_image_text",value:function(e,t,s){var n=window.Tesseract,a=this;n.recognize(e).progress((function(e){t(Math.round(100*e.progress))})).then((function(e){h()(".progress_box").css({visibility:"hidden"}),a.send_message_to_room("new_message",e.text)}))}},{key:"send_message_to_room",value:function(e,t){this.client.send(JSON.stringify({command:e,message:t,username:this.username,roomname:this.roomname}))}},{key:"clear_room_messages",value:function(e){this.client.send(JSON.stringify({command:"clear_room_messages",username:this.username,roomname:this.roomname,password:e}))}},{key:"get_token",value:function(){var e=null,t="csrftoken";if(document.cookie&&""!==document.cookie)for(var s=document.cookie.split(";"),n=0;n<s.length;n++){var a=s[n].trim();if(a.substring(0,t.length+1)==t+"="){e=decodeURIComponent(a.substring(t.length+1));break}}return e}},{key:"get_client",value:function(){return this.client}},{key:"get_messages",value:function(){return this.messages}},{key:"get_response",value:function(){return this.response}},{key:"get_room_messages",value:function(e){var t=[];return this.messages.map((function(s){s.roomname===e&&t.push(s)})),t}},{key:"get_answered_messages",value:function(){var e=[];return this.messages.map((function(t){!0===t.isanswer&&e.push(t)})),e}},{key:"set_roomname",value:function(e){this.roomname=e}},{key:"get_roomname",value:function(){return this.roomname}},{key:"set_username",value:function(e){this.username=e}},{key:"get_username",value:function(){return this.username}},{key:"get_hostnmae",value:function(){return this.hostname}},{key:"get_ws_protocol",value:function(){return this.ws_protocol}}]),e}(),I=(n.Component,function(e){Object(m.a)(s,e);var t=Object(d.a)(s);function s(){var e;Object(c.a)(this,s);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).message_api=e.props.message_api,e.state={isLoggedIn:!0,isNewAnswer:!0,messages:[]},e}return Object(l.a)(s,[{key:"componentDidMount",value:function(){this.setState({messages:this.message_api.get_answered_messages()})}},{key:"render",value:function(){return this.state.isNewAnswer?Object(N.jsx)("div",{id:"answers_box",className:"AnswerBox"}):(this.state.isNewAnswer=!1,Object(N.jsx)("div",{className:"AnswerBox"}))}}]),s}(n.Component)),L=window.location.host,M="https:"==window.location.protocol?"wss":"ws",F=function(e){Object(m.a)(s,e);var t=Object(d.a)(s);function s(e){var n;return Object(c.a)(this,s),(n=t.call(this,e)).client=new WebSocket(M+"://"+L+"/ws/chat/"+n.props.roomname+"/"),n.username=n.props.username,n.roomname=n.props.roomname,n.state={questions_layout:!0,answer_layout:!1},n.message_api=new D(n.client),n.message_api.load_messages(),n.message_api.set_username(n.username),n.message_api.set_roomname(n.roomname),n.question_layout_handler=n.question_layout_handler.bind(Object(u.a)(n)),n.answer_layout_handler=n.answer_layout_handler.bind(Object(u.a)(n)),n}return Object(l.a)(s,[{key:"question_layout_handler",value:function(){this.setState({questions_layout:!0,answer_layout:!1})}},{key:"answer_layout_handler",value:function(){this.setState({questions_layout:!1,answer_layout:!0})}},{key:"render",value:function(){var e,t=this.state.answer_layout,s=this.state.questions_layout;return t?e=Object(N.jsx)("div",{className:"AnswerBox",children:Object(N.jsx)(I,{message_api:this.message_api})}):s&&(e=Object(N.jsx)("div",{className:"QuestionViewContainer",children:Object(N.jsx)(A,{message_api:this.message_api,username:this.username,roomname:this.roomname})})),Object(N.jsx)("div",{className:"Home",children:e})}}]),s}(n.Component),R=function(e){Object(m.a)(s,e);var t=Object(d.a)(s);function s(e){var n;return Object(c.a)(this,s),(n=t.call(this,e)).state={isLoggedIn:!1,username:"",roomname:""},n.handleRoomName=n.handleRoomName.bind(Object(u.a)(n)),n.handleUsername=n.handleUsername.bind(Object(u.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(u.a)(n)),n}return Object(l.a)(s,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("username"),t=localStorage.getItem("roomname");null!=e&&null!=t?(this.setState({username:e,roomname:t}),this.setState({isLoggedIn:!0})):this.setState({isLoggedIn:!1,username:"",password:""}),this.searchInput.focus()}},{key:"handleSubmit",value:function(e){var t=this.state.username,s=this.state.roomname;""!=t&&""!=s?(localStorage.setItem("username",this.state.username),localStorage.setItem("roomname",this.state.roomname),this.setState({isLoggedIn:!0})):alert("You can't leave any field empty"),e.preventDefault()}},{key:"handleRoomName",value:function(e){this.setState({roomname:e.target.value})}},{key:"handleUsername",value:function(e){this.setState({username:e.target.value})}},{key:"render",value:function(){var e=this;return!1===this.state.isLoggedIn?Object(N.jsx)("div",{className:"RoomContainer",children:Object(N.jsxs)("form",{className:"RoomForm",onSubmit:this.handleSubmit,children:[Object(N.jsx)("p",{className:"intro",children:"Created By Shivansh Shrivastava"}),Object(N.jsx)("label",{htmlFor:"",children:"Enter Username : "}),Object(N.jsx)("input",{className:"input-username",ref:function(t){return e.searchInput=t},type:"text",onChange:this.handleUsername,value:this.state.username}),Object(N.jsx)("label",{htmlFor:"",children:"Enter Room Name : "}),Object(N.jsx)("input",{className:"input-room-name",type:"text",onChange:this.handleRoomName,value:this.state.roomname}),Object(N.jsx)("input",{className:"input-submit",type:"submit",value:"Enter"})]})}):Object(N.jsx)(F,{username:this.state.username,roomname:this.state.roomname})}}]),s}(a.a.Component);s(59);var H=function(){return Object(N.jsx)(N.Fragment,{children:Object(N.jsx)(R,{})})},U=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,61)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;s(e),n(e),a(e),o(e),i(e)}))};i.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(H,{})}),document.getElementById("root")),U()}},[[60,1,2]]]);
//# sourceMappingURL=main.551f42a9.chunk.js.map