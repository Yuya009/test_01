$(function() {
    let d = 0;
    const img = ["buke.png", "toku.jpg", "carama.png"];
    // $(".icon").on("click", function() {
    //     console.log(this);
    //     d = $(this).attr("dta-img")
    // })

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBW6_TzdlvGH_0I0dmExZpx7KChUqp41yE",
        authDomain: "booking-10e58.firebaseapp.com",
        databaseURL: "https://booking-10e58.firebaseio.com",
        projectId: "booking-10e58",
        storageBucket: "booking-10e58.appspot.com",
        messagingSenderId: "119967074200",
        appId: "1:119967074200:web:76780c28901d4359870ded"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //firebaseのデーターベース（保存させる場所）を登録
    const newPostRef = firebase.database().ref();

    // 送信ボタンをクリックされたら次の処理をする
    $("#send").on("click", function () {
        if(!$("#text").val()) return; //空白の時は送信しない
        // データを登録で送る
        newPostRef.push({
          //username: $("#username").val(), //名前
          text: $("#text").val(), //テキストエリア
          icon: d, //アイコン
          time: nowdate() //投稿時間
        })
        $("#text").val(""); //空にする
        //$("#username").val(""); //空にする
      });

    // 受信処理
    newPostRef.on("child_added", function (data) {
        let v = data.val(); //ここに保存されたデータが全て入ってくる  
        console.log(v); //vの変数に入っているオブジェクトを全てみる
  
        let str = `
        <div id = "output_box" class="output_box">
            <div class="icon_left_1">
                <img class="icon_left" src="img/${img[v.icon]}">
            </div>
            <div class="memo_text_1">
                <p class="memo_text">${v.text}</p>
            </div>
            <div class="time_text">
                <p>${v.time}</p>
        </div>`;
  
        // ここでデータをhtmlに埋め込む
        $("#output").append(str);
        //下までスクロール
        $("#output").animate({scrollTop: $("#output")[0].scrollHeight}, "fast");
      })

    // 全削除
    $("#delete").on("click", function() {
        newPostRef.remove();
        window.location.reload();
    });

    //時間取得
    function nowdate() {
        let dt = new Date();
        let time = `${dt.getHours()}:${dt.getMinutes()}`;
        return time;
    }
}); 
