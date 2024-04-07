var useri = {
    course: "S",
    number: "2400",
};

var things_list = {
    a:["東京書籍","現代の国語"],
    b:["大修館書店","トータルサポート 新国語便覧"],
    c:["東京書籍","現代の国語 学習課題ノート"],
    d:["東京書籍","精選言語文化"],
    e:["東京書籍","精選言語文化 学習課題ノート"],
    f:["帝国書院","新詳地理探求"],
    g:["二宮書店","高等地図帳"],
    h:["二宮書店","データブックオブザワールド 2024"],
    i:["国土地理院","1:25000地形図「三島」"],
    j:["国土地理院","1:25000地形図「沼津」"],
    k:["大日本図書","新基礎数学 改訂版"],
    l:["大日本図書","新基礎数学問題集 改訂版"],
    m:["森北出版","新編高専の数学1 問題集"],
    n:["数研出版","総合物理1 力と運動・熱"],
    o:["数研出版","リードα 物理基礎・物理 新課程"],
    p:["数研出版","フォトサイエンス 物理図録 新課程"],
    q:["沼津工業高等専門学校","物理Ⅰ演習書（沼津高専物理学教室）"],
    r:["東京書籍","化学基礎"],
    s:["東京書籍","ニューアチーブ 化学基礎（701）新課程版"],
    t:["東京書籍","ニューグローバル 化学基礎＋化学 新課程版"],
    u:["数研出版","フォトサイエンス 化学図録 新課程版"],
    v:["東京書籍","化学Vol.1 理論編"],
    w:["東京書籍","化学Vol.2 物質編"],
    x:["東京書籍","ニューアチーブ 化学（701・702）"],
    y:["東京書籍","地学基礎"],
    z:["数研出版","新編 生物基礎"],
    aa:["文英堂","Grove English Communication Ⅰ"],
    ab:["文英堂","Grove English Communication Ⅰ WORKBOOK（719）"],
    ac:["文英堂","Grove English Communication Ⅰ FILL-IN NOTEBOOK（719）"],
    ad:["三省堂","チャンクで英単語 Standard 第2版"],
    ae:["いいずな書店","be English Logic and Expression Ⅰ Smart"],
    af:["桐原書店","総合英語FACTBOOK これからの英文法 New Edition"],
    ag:["桐原書店","総合英語FACTBOOK English Grammar Advanced New Edition"],
    ah:["桐原書店","総合英語FACTBOOK English Grammar Advanced Workbook New Edition"],
    ai:["Pearson","English FIRSTHAND SUCCESS"],
    aj:["教育芸術社","高校生の音楽Ⅰ"],
    ak:["実教出版","インターネット社会を生きるための情報倫理 改訂版"],
    al:["実教出版","情報セキュリティ読本 6訂版"],
    am:["実教出版","機械製図"],
    an:["実教出版","基礎製図練習ノート"],
    ao:["オーム社","テキストブック電気回路"],
    ap:["電気書院","ドリルと演習シリーズ電気回路"],
    aq:["森北出版","例題で学ぶやさしい電気回路 直流編（新装版）"],
    ar:["物質工学科","工学基礎Ⅲ C1 実験書"],
    as:["沼津工業高等専門学校","工学基礎Ⅰ 実験書"],
    at:["沼津工業高等専門学校","工学基礎Ⅱ 実験書"],
    au:["","国語辞典"],
    av:["","古語/漢和辞典"],
    aw:["","英和辞典"],
    ax:["","電子辞書"],
    ay:["","電卓/関数電卓"],
    az:["","情報端末"],
};

var subject_list = {
    a:"現代の国語",
    b:"言語文化",
    c:"地理",
    d:"基礎数学Ⅰ、Ⅱ",
    e:"物理Ⅰ",
    f:"化学基礎",
    g:"化学Ｂ",
    h:"地球と生命の科学",
    i:"総合英語ＡⅠ",
    j:"英語ＷⅠ",
    k:"英語Ｃ",
    l:"音楽",
    m:"情報処理基礎",
    n:"機械工学基礎",
    o:"直流回路",
    p:"工学技術セミナー",
    q:"物質工学科",
    r:"工学基礎Ⅰ",
    s:"工学基礎Ⅱ",
};

var things_group = {
    a:["d","e","b"],
    b:["a","c","b"],
    c:["f","g","h"],
    d:["k","l","m"],
    e:["n","o","p","q"],
    f:["r","s","t","u"],
    g:[""],
    h:["y","z"],
    i:["aa","ab","ac","ad","aw|ax"],
    j:["ae","af","ag","ah","aw|ax"],
    k:["ai"],
    l:["aj"],
    m:["az"],
    n:[""],
    o:[""],
    p:[""],
    q:[""],
    r:["as","ay"],
    s:["at","ba"],
};

function save(label,value,collection,document) {
    var db = firebase.firestore();
    var userRef = db.collection(collection).doc(document);
    label = String(label);
    userRef.set({[label]: value}, { merge: true });
}

function getThings(group) {

    var list = {
        subject_name: subject_list[group],
        properties: {
            either: [],
        },
        things: [],
    };

    for(var i = 0;i < things_group[group].length;i++) {
        if(things_group[group][i].length <= 2){
            list.things.push([things_list[things_group[group][i]][0],things_list[things_group[group][i]][1]]);
        }else if(things_group[group][i].includes("|")) {
            var arr1 = things_group[group][i].split("|");
            var arr2 = [];
            for(var j = 0;j < arr1.length;j++) {
                list.things.push([things_list[arr1[j]][0],things_list[arr1[j]][1]]);
                arr2.push(list.things.length-1);
            }
            list.properties.either.push(arr2);
        }
    }

    console.log(list);

    return list;
}

function addSelectOptions(id, arr, arrid) {
    var e_select = document.getElementById(id);
    while (0 < e_select.childNodes.length) {
		e_select.removeChild(e_select.childNodes[0]);
	}
    
    for(var i = 0;i < arr.length;i++) {
        var e_option = document.createElement('option');
        var text = document.createTextNode(arr[i]);
        e_option.appendChild(text);
        e_option.setAttribute("id","option_"+arrid[i]);
        e_select.appendChild(e_option);
    }
    
}


function addUlLi(id, arr) {
    var e_ul = document.getElementById(id);
    
    for(var i = 0;i < arr.length;i++) {
        var e_li = document.createElement('li');
        e_li.innerHTML = arr[i];
        e_ul.appendChild(e_li);
    }
}

function createThingsList(id,group) {
    var list_id_list = [id];
    var things_object = getThings(group);
    var t = "";
    var arr = [];
    for(var l = 0;l < list_id_list.length;l++) {
        var n = things_object.things.length;
        var bool1 = false;
        for(var i = 0;i < n;i++) {
            bool1 = false;
            for(var j = 0;j < things_object.properties.either.length;j++) {
                if(things_object.properties.either[j].includes(i)) {
                    if(t.length != 0) t += "<div style='font-size: 12px'>&nbsp;または</div>";
                    t += things_object.things[i][1];
                    if(things_object.things[i][0].length > 0) t += " （"+things_object.things[i][0]+"）"
                    bool1 = true;
                }
            }

            console.log(t,bool1);

            if(!bool1&&t.length > 0) {
                arr.push(t);
                t = "";
            }
            if(!bool1&&t.length <= 0) {
                t = things_object.things[i][1];
                if(things_object.things[i][0].length > 0) t += " （"+things_object.things[i][0]+"）"
            }

            if(!bool1) {
                arr.push(t);
                t = "";
            }
        }

        if(bool1) {
            arr.push(t);
            t = "";
        }

        addUlLi(list_id_list[l],arr);
    }
}

function selectChange(e) {
    var e_ul = document.getElementById(e.target.getAttribute("id").replace("select","list"));
    while (0 < e_ul.childNodes.length) {
		e_ul.removeChild(e_ul.childNodes[0]);
	}
    console.log("ok")
    createThingsList(e.target.getAttribute("id").replace("select","list"),e.target.options[e.target.selectedIndex].getAttribute("id").replace("option_",""));
}

function setup() {
    var select_id_list = ["select1"];
    var subject_name_list = Object.values(subject_list);
    var subject_key_list = Object.keys(subject_list);
    for(var i = 0;i < select_id_list.length;i++) {
        document.getElementById(select_id_list[i]).addEventListener('change', selectChange);
        addSelectOptions(select_id_list[i],subject_name_list,subject_key_list);
        selectChange({target: document.getElementById(select_id_list[i])});
    }
}

setup();