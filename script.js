window.onload = function () {     // ハンバーガーメニュー
  var nav = document.getElementById('nav-wrapper');
  var hamburger = document.getElementById('js-hamburger');
  var blackBg = document.getElementById('js-black-bg');

  hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
  });
  blackBg.addEventListener('click', function () {
      nav.classList.remove('open');
  });
};

let harvestPageNumber = 0;

const dom_version = document.getElementById('version');
dom_version.innerHTML = `v1.0.28　|　Powered by SYMBOL`;

const sym = require('/node_modules/symbol-sdk');
const op = require("/node_modules/rxjs/operators");
const rxjs = require("/node_modules/rxjs");

//MAIN_NET の場合

const EPOCH_M = 1615853185;
const NODE_URL_M = 'https://symbol-mikun.net:3001';
const NET_TYPE_M = sym.NetworkType.MAIN_NET;
const XYM_ID_M = '6BED913FA20223F8';
const GENERATION_HASH_M = '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6';

const repo_M = new sym.RepositoryFactoryHttp(NODE_URL_M);      // RepositoryFactoryはSymbol-SDKで提供されるアカウントやモザイク等の機能を提供するRepositoryを作成するためのもの
const accountRepo_M = repo_M.createAccountRepository();
const txRepo_M = repo_M.createTransactionRepository();
const receiptRepo_M = repo_M.createReceiptRepository();
const mosaicRepo_M = repo_M.createMosaicRepository();
const nsRepo_M = repo_M.createNamespaceRepository();
const nwRepo_M = repo_M.createNetworkRepository();
const chainRepo_M = repo_M.createChainRepository();
const blockRepo1_M = repo_M.createBlockRepository();
const nodeRepo_M = repo_M.createNodeRepository();
const metaRepo_M = repo_M.createMetadataRepository();
const metaService_M = new sym.MetadataTransactionService(metaRepo_M);
const resMosaicRepo_M = repo_M.createRestrictionMosaicRepository();
const resAccountRepo_M = repo_M.createRestrictionAccountRepository();
const EXPLORER_M = "https://symbol.fyi";
const totalChainImportance = 78429286;

//TEST_NET の場合

const EPOCH_T = 1667250467;
//const EPOCH_T = 1672735883;  //Canade
const NODE_URL_T = 'https://mikun-testnet.tk:3001';
const NET_TYPE_T = sym.NetworkType.TEST_NET;
const XYM_ID_T = '72C0212E67A08BCE';
//const XYM_ID_T = '5282230404218E56';  //Canade CBDP
const GENERATION_HASH_T = '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4';
//const GENERATION_HASH_T = 'AA443BA0A8AC1300743B44215D4436694013E52518B95EB05B3DCF4D66C4319B'; // Canade

const repo_T = new sym.RepositoryFactoryHttp(NODE_URL_T);       // RepositoryFactoryはSymbol-SDKで提供されるアカウントやモザイク等の機能を提供するRepositoryを作成するためのもの
const accountRepo_T = repo_T.createAccountRepository();
const txRepo_T = repo_T.createTransactionRepository();
const receiptRepo_T = repo_T.createReceiptRepository();
const mosaicRepo_T = repo_T.createMosaicRepository();
const nsRepo_T = repo_T.createNamespaceRepository();
const nwRepo_T = repo_T.createNetworkRepository();
const chainRepo_T = repo_T.createChainRepository();
const blockRepo1_T = repo_T.createBlockRepository();
const nodeRepo_T = repo_T.createNodeRepository();
const metaRepo_T = repo_T.createMetadataRepository();
const metaService_T = new sym.MetadataTransactionService(metaRepo_T);
const resMosaicRepo_T = repo_T.createRestrictionMosaicRepository();
const resAccountRepo_T = repo_T.createRestrictionAccountRepository();
const EXPLORER_T = "https://testnet.symbol.fyi";

let epochAdjustment;
let generationHash;
let NODE;
let networkType;
let XYM_ID;     
let repo;
let accountRepo;
let txRepo;
let receiptRepo;
let mosaicRepo;
let nsRepo;
let nwRepo;
let chainRepo;
let blockRepo1;
let nodeRepo;
let EXPLORER;
let grace_block;
let metaRepo;
let metaService;
let resMosaicRepo;

setTimeout(() => {  //////////////////  指定した時間後に実行する  ////////////////////////////////////////////////
  
    console.log("SSS_Link=",window.isAllowedSSS());
    window.requestSSS();    // SSSと連携されてない場合、右下にメッセージが出る

    if (isAllowedSSS() === false){
      swal('SSS Link Error!!',`　　　　　　　SSSとLinkしてください。
      Link済みの場合は、ブラウザをリロードしてください。`);
      //return;
    }
  
 const address = sym.Address.createFromRawAddress(window.SSS.activeAddress);
  
  console.log("activeAddress=",address.address);
  
 const check_netType = address.address.charAt(0);     // 1文字目を抽出

   if (check_netType === 'N'){           //ネットワークの判別　 メインネット 
       epochAdjustment = EPOCH_M;
       NODE = NODE_URL_M;
       networkType = NET_TYPE_M;
       generationHash = GENERATION_HASH_M;
       XYM_ID = XYM_ID_M;
     
       repo = repo_M;
       accountRepo = accountRepo_M;
       txRepo = txRepo_M;
       receiptRepo = receiptRepo_M;
       mosaicRepo = mosaicRepo_M;
       nsRepo = nsRepo_M;
       nwRepo = nwRepo_M;
       chainRepo = chainRepo_M;
       blockRepo1 = blockRepo1_M;
       nodeRepo = nodeRepo_M;
       EXPLORER = EXPLORER_M;
       grace_block = 86400;
       metaRepo = metaRepo_M;
       metaService = metaService_M;
       resMosaicRepo = resMosaicRepo_M;
       resAccountRepo = resAccountRepo_M;

      console.log("MAIN_NET");
   }else 
      if (check_netType === 'T'){      // テストネット
          epochAdjustment = EPOCH_T;
          NODE = NODE_URL_T;
          networkType = NET_TYPE_T;
          generationHash = GENERATION_HASH_T;
          XYM_ID = XYM_ID_T;
        
          repo = repo_T;
          accountRepo = accountRepo_T;
          txRepo = txRepo_T;
          receiptRepo = receiptRepo_T;
          mosaicRepo = mosaicRepo_T;
          nsRepo = nsRepo_T;
          nwRepo = nwRepo_T;
          chainRepo = chainRepo_T;
          blockRepo1 = blockRepo1_T;
          nodeRepo = nodeRepo_T;
          EXPLORER = EXPLORER_T;
          grace_block = 2880;
          metaRepo = metaRepo_T;
          metaService = metaService_T;
          resMosaicRepo = resMosaicRepo_T;
          resAccountRepo = resAccountRepo_T;
        
          console.log("TEST_NET");
      }
       console.log("check_netType=",check_netType);
     

 const dom_netType = document.getElementById('netType');  // network Type を表示　
     
  if (networkType === NET_TYPE_M){   
     dom_netType.innerHTML = `<font color="#ff00ff">< MAIN_NET ></font>`
  }else
     if (networkType === NET_TYPE_T){
        dom_netType.innerHTML = `<font color="ff8c00">< TEST_NET ></font>`
  }    
     
 const dom_addr = document.getElementById('wallet-addr');
 //dom_addr.innerText = address.pretty();                         // address.pretty() アドレスがハイフンで区切られた文字列で表示される
  dom_addr.innerHTML = `<div class="copy_container"> ${address.address}<input type="image" src="src/copy.png" class="copy_bt" height="30px" id="${address.address}" onclick="Onclick_Copy(this.id);" /></div>`;          // ハイフン無しでアドレスを表示 　& 　コピーボタンを設置

 console.log("address= wallet-addr",address);//////////////////////////////////////////////////////////////////////////////////////////////////  
     
      const dom_explorer = document.getElementById('explorer');  // Wallet 右上のExplorerリンク
    
          dom_explorer.innerHTML = `<a href="${EXPLORER}/accounts/${address.address}" target="_blank" rel="noopener noreferrer"> Symbol Explorer </a>`; 

      const dom_faucet = document.getElementById('faucet');  // Wallet 右上のFaucetリンク

      //dom_faucet.innerHTML =`<a style="color: blue"><i>　　MAIN NET</style></i></a>`;
      if (networkType === 152){ // テストネットの場合表示
        dom_faucet.innerHTML = `<a href="https://testnet.symbol.tools/?recipient=${window.SSS.activeAddress}" target="_blank" rel="noopener noreferrer"> 🚰  Faucet🚰 </a>`;
      }

      const dom_xembook = document.getElementById('xembook');  // Wallet 右上のxembookリンク
      
      //dom_xembook.innerHTML =`<a style="color: blue"><i>　　TEST NET</i></a>`;
      if (networkType === 104){ // メインネットの場合表示
          dom_xembook.innerHTML = `<a href="https://xembook.github.io/xembook/?address=${window.SSS.activeAddress}" target="_blank" rel="noopener noreferrer"> XEMBook </a>`;   
      }

      const dom_nftdrive_explorer = document.getElementById('nftdrive_explorer');  // Wallet 右上の nftdrive リンク
    
          dom_nftdrive_explorer.innerHTML = `<a href="https://nftdrive-explorer.info/?address=${window.SSS.activeAddress}" target="_blank" rel="noopener noreferrer"> NFT-Drive Explorer </a>`;

      
      const dom_hv_checker = document.getElementById('hv_checker');  // Wallet 右上のhv_checkerリンク
    
          dom_hv_checker.innerHTML = `<a href="https://ventus-wallet.tk/HV_Checker" target="_blank" rel="noopener noreferrer"> 🌾 Harvest Checker 🌾</a>`;

      const dom_QR_Auth = document.getElementById('QR_Auth');  // Wallet 右上のQR_Authリンク 

          dom_QR_Auth.innerHTML = `<a href="https://ventus-wallet.tk/QR_Auth/" target="_blank" rel="noopener noreferrer"> QRモザイク認証 </a>`;
      
	
 ///////////////////////////////////////////////    アカウント情報を取得する     ////////////////////////////////////////////

 accountRepo.getAccountInfo(address)
  .toPromise()
  .then((accountInfo) => {
        console.log("accountInfo=",accountInfo)     
        console.log("account_Mosaics =",accountInfo.mosaics.length);
        
        const addr = document.getElementById('aInfo-addr');  // アクティブアドレス
        addr.innerHTML = `<div style="text-align: center;padding-top: 8px"><big><font color="green">${address.address}</font></big></div>`;

        const pubkey = document.getElementById('aInfo-pubkey');  // 公開鍵
        pubkey.innerHTML = `<div style="text-align: center;padding-top: 8px"><big><font color="green">${window.SSS.activePublicKey}</font></big></div>`;

        const impo = document.getElementById('importance');  // インポータンス表示
        let accountImportance = Number(accountInfo.importance.toString()) / totalChainImportance;
        if(accountImportance > 0){
          accountImportance = Math.round( accountImportance );
          accountImportance /= 1000000;
        }

        impo.innerHTML = `<div style="text-align: center;padding-top: 8px"><big><font color="green">${accountImportance} ％</font></big></div>`;

        const hv_status = document.getElementById('hv_status');
        const hv_node = document.getElementById('hv_node');

        if(accountInfo.supplementalPublicKeys.linked !== undefined){  //  account pubkey
          const account_pubkey = accountInfo.supplementalPublicKeys.linked.publicKey;
          //console.log("account_pubkey===============",account_pubkey);
        

          if(accountInfo.supplementalPublicKeys.node !== undefined){   //  node pubkey
            const node_pubkey = accountInfo.supplementalPublicKeys.node.publicKey;
            //console.log("node_pubkey===============",node_pubkey);

            let xhr = new XMLHttpRequest();
            if(networkType === 152){
              xhr.open("GET",`https://testnet.symbol.services/nodes/nodePublicKey/${node_pubkey}`,false);
            }
            if(networkType === 104){
              xhr.open("GET",`https://symbol.services/nodes/nodePublicKey/${node_pubkey}`,false);
            }
          
            let data;
            let data2;
            xhr.send(null);
            if (xhr.status == 200) {
              data = xhr.response;
              data = JSON.parse(data);
              console.log("%cノード=","color: red",data.host);
              
              let xhr2 = new XMLHttpRequest();
              xhr2.open("GET",`https://${data.host}:3001/node/unlockedaccount`,false);
              xhr2.send(null);
                if (xhr2.status == 200) {
                   data2 = xhr2.response;
                   data2 = JSON.parse(data2);
                   //console.log("%c委任公開鍵=","color: red",data2);

                   if (searchArray(data2.unlockedAccount,account_pubkey)){
                       console.log(`有効🟢`);
                       hv_status.innerHTML = `🟢 有効`
                       hv_node.innerHTML = `委任ノード　:　${data.host}`
                   }else{
                     console.log(`無効🔴`);
                     hv_status.innerHTML = `🔴 無効 `
                   }
                }else {
                  console.log(`Error: ${xhr2.status}`);
                }
            }else{
              console.log(`Error: ${xhr.status}`);
            }
          }else{ // node pubkey  が無い場合 (ノードオーナーのアカウントの場合) //////////////////////////////////
            if(accountInfo.supplementalPublicKeys.vrf !== undefined){  //  vrf pubkey

              let xhr = new XMLHttpRequest();
              if(networkType === 152){
                xhr.open("GET",`https://testnet.symbol.services/nodes/${window.SSS.activePublicKey}`,false);
              }
              if(networkType === 104){
                xhr.open("GET",`https://symbol.services/nodes/${window.SSS.activePublicKey}`,false);
              }

              let data;
              let data2;
              xhr.send(null);
                if (xhr.status == 200) {
                   data = xhr.response;
                   data = JSON.parse(data);
                   console.log("%cノード=","color: red",data.host);
              
                   let xhr2 = new XMLHttpRequest();
                   xhr2.open("GET",`https://${data.host}:3001/node/unlockedaccount`,false);
                   xhr2.send(null);
                     if (xhr2.status == 200) {
                        data2 = xhr2.response;
                        data2 = JSON.parse(data2);
                        //console.log("%c委任公開鍵=","color: red",data2);                        

                        if (searchArray(data2.unlockedAccount,account_pubkey)){
                           console.log(`有効🟢`);
                           hv_status.innerHTML = `🟢 有効`
                           hv_node.innerHTML = `委任ノード　:　${data.host}`
                        }else{
                           console.log(`無効🔴`);
                           hv_status.innerHTML = `🔴 無効 `
                        }
                     }else{
                        console.log(`Error: ${xhr2.status}`);
                     }
                }else{
                    console.log(`Error: ${xhr.status}`);
                } 
            }
          }          
        }else{
          hv_status.innerHTML = `🔴 無効 `
        }

        /////////////    harvest レシート  /////////////////////////////////

        getHarvests(15);

        async function getHarvests(pageSize){
          
          harvestPageNumber++;
          
          const res_h =  await receiptRepo.searchReceipts({
           targetAddress: accountInfo.address,
           pageNumber:harvestPageNumber,
		       pageSize:pageSize,
           order:"desc"
          }).toPromise();

          console.log("ハーベスト_res_h === ",res_h);

          var lastHeight = 0;
        	var cnt = 0;
	        for(const statements  of res_h.data){
		        const filterdReceipts = statements.receipts.filter(item => {
		        	if(item.targetAddress){
			        	return item.targetAddress.plain() === accountInfo.address.plain();
		        	}
			        return false;
	        	});

	        	if(statements.height.toString() !== lastHeight.toString()){
			        cnt = 0;
	        	}
      
		        for(const receipt of filterdReceipts){
              console.log("reciepts =========== ",receipt);
		         	showReceiptInfo("harvest",statements.height,receipt,cnt);
			        lastHeight = statements.height;
			        cnt++;
	        	}
        	}

	        if(res_h.isLastPage){
		        $('#harvests_footer').hide();
        	}
	        return res_h.isLastPage;

        }

        $('#harvests_more' ).click(function(){getHarvests(15); return false;});

     //////////////////////////////////////////////////////////////////////

         //ブロック
          chainRepo.getChainInfo().subscribe(chain=>{  //////////   

            rxjs.zip(
              blockRepo1.getBlockByHeight(chain.height),
              blockRepo1.getBlockByHeight(chain.latestFinalizedBlock.height),
            ).subscribe(zip => {

              $("#chain_height").html(    //  最新ブロック
                "[ <a target='_blank' href='" + EXPLORER + "/blocks/" + zip[0].height.compact() + "'>" + zip[0].height.compact() + "</a> ]　日時: " + dispTimeStamp(Number(zip[0].timestamp.toString()),epochAdjustment)
              );
              $("#finalized_chain_height").html(   //  確定ブロック
                "[ <a target='_blank' href='" + EXPLORER + "/blocks/" + zip[1].height.compact() + "'>" + zip[1].height.compact() + "</a> ]　日時: " + dispTimeStamp(Number(zip[1].timestamp.toString()),epochAdjustment)
              );
              console.log("%c現在のブロック高=","color: red",zip[0].height.compact());
              console.log("%cファイナライズブロック=","color: red",zip[1].height.compact());


             /////////////   モザイク　テーブル////////////////////////////////////////////////

              mosaicRepo.search({ownerAddress:accountInfo.address,
                                 pageNumber: 1,
                                 pageSize: 50,
                                 order: sym.Order.Desc
                                })
              .subscribe(async mosaic=>{
              
                console.log("mosaic_data=",mosaic.data);

                console.log("モザイクの数",mosaic.data.length);

                   const select_revoke = []; //　セレクトボックス初期化 (モザイク回収)
                   const select_mosaicID = []; //　セレクトボックス初期化 (モザイクID)
                   const select_mosaic_sup =[]; //　セレクトボックス初期化 (モザイクID 供給量変更)
                   var body = document.getElementById("ms_table");

                   // <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
                   var tbl = document.createElement("table");
                   var tblBody = document.createElement("tbody");
                   let mosaicNames;
                   // すべてのセルを作成
                   for (var i = -1; i < mosaic.data.length; i++) {  // ネームスペースの数だけ繰り返す
                        if (i > -1){
                            mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(mosaic.data[i].id.id.toHex())]).toPromise(); // モザイクIDからNamespaceの情報を取得する
                        }
                     // 表の行を作成
                     var row = document.createElement("tr");

                     for (var j = 0; j < 11; j++) {
                       // <td> 要素とテキストノードを作成し、テキストノードを
                       // <td> の内容として、その <td> を表の行の末尾に追加
                       var cell = document.createElement("td");                                                   
                          switch(j){
                            case 0:   //モザイクID
                              if (i === -1){
                                  var cellText = document.createTextNode("モザイクID");
                                  select_mosaicID.push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
                                  select_mosaic_sup.push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
                              break;
                              }                             
                                 var cellText = document.createTextNode(mosaic.data[i].id.id.toHex());
                                 if (mosaic.data[i].duration.compact() === 0){ // ステータスが無効なモザイクを排除                               
                                    select_mosaicID.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
                                    if (mosaic.data[i].flags.supplyMutable === true){ // 供給量可変　🟢
                                      select_mosaic_sup.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
                                    }
                                }else
                                   if (endHeight - zip[0].height.compact() > 0){ // ステータスが無効なモザイクを排除
                                      select_mosaicID.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
                                      if (mosaic.data[i].flags.supplyMutable === true){ // 供給量可変　🟢
                                        select_mosaic_sup.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
                                      }
                                   }
                              break;                
                            case 1:   //ネームスペース名
                              if (i === -1){
                                  var cellText = document.createTextNode("ネームスペース名");
                              break;
                              } 
                              if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合                       
                                  var cellText = document.createTextNode([mosaicNames][0][0].names[0].name);
                              }else{   // ネームスペースが無い場合
                                    var cellText = document.createTextNode("N/A"); 
                              }
                              break;       
                            case 2:   // 供給量
                              if (i === -1){
                                  var cellText = document.createTextNode("供給量");
                              break;
                              }
                             var supply1 = mosaic.data[i].supply.compact()/(10 ** mosaic.data[i].divisibility);                                
                                 supply1 = supply1.toLocaleString(undefined, {
                                  minimumFractionDigits: mosaic.data[i].divisibility,
                                  maximumFractionDigits: mosaic.data[i].divisibility,
                                });

                              var cellText = document.createTextNode(supply1); 
                              break; 
                            case 3:   //残高
                              if (i === -1){
                                  var cellText = document.createTextNode("残高");
                                  break;
                              }                             
                              for (var k = 0; k < accountInfo.mosaics.length; k++){ 
                                if (accountInfo.mosaics[k].id.id.toHex() === mosaic.data[i].id.id.toHex()){ // accountInfoのamount データを探す
                                   var balance = accountInfo.mosaics[k].amount.compact();
                                }
                              }
                              balance = balance/(10 ** mosaic.data[i].divisibility);   // 可分性を考慮
                              balance = balance.toLocaleString(undefined, {
                                minimumFractionDigits: mosaic.data[i].divisibility,
                                maximumFractionDigits: mosaic.data[i].divisibility,
                              });

                              var cellText = document.createTextNode(balance);
                              break;
                            case 4:   //有効期限
                              if (i === -1){
                                  var cellText = document.createTextNode("有効期限");
                                  break;
                              }
                              if (mosaic.data[i].duration.compact() === 0){
                                  var cellText = document.createTextNode("---　無期限　---");
                              }else{
                                   var endHeight = mosaic.data[i].startHeight.compact() + mosaic.data[i].duration.compact()   
                                   var remainHeight = endHeight - zip[0].height.compact();    
                                        t = dispTimeStamp(zip[0].timestamp.compact() + (remainHeight * 30000),epochAdjustment)                  
                                   var cellText = document.createTextNode(t);
                              }
                              break;
                            case 5:   // ステータス
                              if (i === -1){
                                  var cellText = document.createTextNode("ステータス");
                                  break;
                              }
                              if (mosaic.data[i].duration.compact() === 0){
                                  var cellText = document.createTextNode("　　🟢");
                              }else
                                 if (mosaic.data[i].duration.compact() > 0){
                                     var endHeight = mosaic.data[i].startHeight.compact() + mosaic.data[i].duration.compact()
                                     if (endHeight - zip[0].height.compact() > 0){
                                       var cellText = document.createTextNode("　　🟢");
                                     }else{
                                      var cellText = document.createTextNode("　　❌");
                                     }
                                 }
                              break;
                            case 6:   // 可分性
                              if (i === -1){
                                  var cellText = document.createTextNode("可分性");
                                  break;
                              }
                                  var cellText = document.createTextNode(`　${mosaic.data[i].divisibility}`);
                              break;
                            case 7:   //　制限可
                              if (i === -1){
                                  var cellText = document.createTextNode("制限可");
                                  break;
                              }
                              if (mosaic.data[i].flags.restrictable === true){
                                  var cellText = document.createTextNode("　🟢");
                              }else
                                 if (mosaic.data[i].flags.restrictable === false){
                                     var cellText = document.createTextNode("　❌");
                                 }                           
                              break;                                  
                            case 8:  // 供給量可変
                              if (i === -1){
                                  var cellText = document.createTextNode("供給量可変");
                                  break;
                              }
                              if (mosaic.data[i].flags.supplyMutable === true){
                                  var cellText = document.createTextNode("　　🟢");
                              }else
                                 if (mosaic.data[i].flags.supplyMutable === false){
                                     var cellText = document.createTextNode("　　❌");
                                 }                              
                              break;      
                            case 9:   // 転送可
                              if (i === -1){
                                  var cellText = document.createTextNode("転送可");                                  
                                  break;
                              }
                              if (mosaic.data[i].flags.transferable === true){
                                  var cellText = document.createTextNode("　🟢");
                              }else
                                 if (mosaic.data[i].flags.transferable === false){
                                     var cellText = document.createTextNode("　❌");
                                 }                                                    
                              break;      
                            case 10:   // 回収可
                              if (i === -1){
                                  var cellText = document.createTextNode("回収可");
                                  select_revoke.push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
                                  break;
                              }
                              if (mosaic.data[i].flags.revokable === true){
                                  var cellText = document.createTextNode("　🟢");
                                  if(mosaic.data[i].duration.compact() === 0){ // ステータスが無効なモザイクを排除
                                    select_revoke.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
                                  }else
                                     if (endHeight - zip[0].height.compact() > 0){ // ステータスが無効なモザイクを排除
                                        select_revoke.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
                                     }
                              }else
                                 if (mosaic.data[i].flags.revokable === false){
                                     var cellText = document.createTextNode("　❌");
                                 }                           
                              break;      
                            case 11:   // 編集
                              /////////////////////////////  保留  //////////
                              if (i === -1){
                                  var cellText = document.createTextNode("");
                                  break;
                              }
                              if (mosaic.data[i].duration.compact() === 0){
                                  var cellText = document.createTextNode("");
                              }else
                                 if (mosaic.data[i].duration.compact() > 0){
                                     var endHeight = mosaic.data[i].startHeight.compact() + mosaic.data[i].duration.compact()
                                     if (endHeight - zip[0].height.compact() > 0){
                                         var cellText = document.createTextNode("");
                                     }else{
                                          var cellText = document.createTextNode("");
                                     }
                              }
                              break;    
                            }      
                       cell.appendChild(cellText);
                       row.appendChild(cell);
                     }
                       
                     // 表の本体の末尾に行を追加
                     tblBody.appendChild(row);
                   }
                 
                   // <tbody> を <table> の中に追加
                   tbl.appendChild(tblBody);
                   // <table> を <body> の中に追加
                   body.appendChild(tbl);
                   // tbl の border 属性を 2 に設定
                   tbl.setAttribute("border", "1"); 
                   console.log("%cselect_revoke=","color: red",select_revoke);
                   console.log("%cselect_mosaicID=","color: red",select_mosaicID);
                   console.log("%cselect_mosaic_sup=","color: red",select_mosaic_sup);
                   
                    ////    セレクトボックス  (回収モザイク用)    ///////////////////////////////////////

                   const jsSelectBox_rev = document.querySelector('.revoke_select');
                   const select = document.createElement('select');

                   select.classList.add('select_r');
                   select_revoke.forEach((v) => {
                     const option = document.createElement('option');
                     option.value = v.value;
                     option.textContent = v.name;
                     select.appendChild(option);
                   });
                   jsSelectBox_rev.appendChild(select);

                   const selectBox = document.querySelector('.select_r');   //  イベントリスナー
                   
                   // イベントリスナーを追加
                   selectBox.addEventListener("change", function(event) {
                     // セレクトボックスの値が変化したときの処理
                     //const selectedValue = event.target.value;
                     //console.log("選択された値: ", selectedValue);

                        holder_list(); // ホルダーリストを呼び出す
                   });



                   ////    select_mosaicID  (Metadata用)    ///////////////////////////////////////

                   const jsSelectBox_mosaicID = document.querySelector('.select_mosaicID');
                   const select_mo = document.createElement('select');

                   select_mo.classList.add('select_mo');
                   select_mosaicID.forEach((v) => {
                     const option = document.createElement('option');
                     option.value = v.value;
                     option.textContent = v.name;
                     select_mo.appendChild(option);
                   });
                   jsSelectBox_mosaicID.appendChild(select_mo);

                     /////   mosaic_ID セレクトボックス  (供給量変更用）///////////////////////////////

                     const jsSelectBox_sup = document.querySelector('.select_mosaic_sup');
                     const select_sup = document.createElement('select');
  
                     select_sup.classList.add('select_sup');
                     select_mosaic_sup.forEach((v) => {
                       const option = document.createElement('option');
                       option.value = v.value;
                       option.textContent = v.name;
                       select_sup.appendChild(option);
                     });
                     jsSelectBox_sup.appendChild(select_sup);                

              });
                          

              //// ネームスペース テーブル　//////////////////////////////////////////////////////////////////////////////
 
              nsRepo.search({ownerAddress:accountInfo.address,
                             pageNumber: 1,
                             pageSize: 50,
                             order: sym.Order.Desc
                            }) /////    保有ネームスペース
              .subscribe(async ns=>{
                
                console.log("{ownerAddress:accountInfo.address}: ",{ownerAddress:accountInfo.address});

                var Nnames1 = new Array(ns.data.length);
                var i=0;
                var ddNamespace = new Array(ns.data.length);
                for(const nsInfo of ns.data){  

                //  console.log("%cnsInfo==","color: blue",nsInfo)
                  if(nsInfo.levels.length == 1){ //ルートネームスペース

                    const Nnames = await nsRepo.getNamespacesNames([nsInfo.levels[nsInfo.levels.length - 1]]).toPromise();
                          Nnames1[i] = Nnames[0].name;       

                    var namespace = "";
                    for(const namespaceName of Nnames){
                      if(namespace != ""){
                        namespace = "." + namespace;
                      }
                      namespace = namespaceName.name + namespace;
                    }

                    var remainHeight = nsInfo.endHeight.compact() - zip[0].height.compact();
                      //  console.log("期限が終了するブロック: " + nsInfo.endHeight.compact());  
                      //  console.log("あと残りのブロック: " + remainHeight);

                    t = dispTimeStamp(zip[0].timestamp.compact() + (remainHeight * 30000),epochAdjustment)
                 // t = dispTimeStamp(nsInfo.endHeight.compact() * 30000,epochAdjustment);
                 // ddNamespace += '<dd>' + namespace + ' [期限: ' + t + ']</dd>';
                    ddNamespace[i] = t;
                  } 
      
                  if(nsInfo.levels.length == 2){ //サブネームスペース                
                    const Nnames = await nsRepo.getNamespacesNames([nsInfo.levels[nsInfo.levels.length - 1]]).toPromise();
                    Nnames1[i] = Nnames[1].name + "." + Nnames[0].name;
                    //console.log("%cNnames[i]================","color: red",Nnames[i])
                    //ddNamespace[i] = t; 
                  }

                  if(nsInfo.levels.length == 3){ //サブネームスペース                
                    const Nnames = await nsRepo.getNamespacesNames([nsInfo.levels[nsInfo.levels.length - 1]]).toPromise();
                    Nnames1[i] = Nnames[2].name + "." + Nnames[1].name + "." + Nnames[0].name;
                   //ddNamespace[i] = t; 
                  }

                  i=++i;
                }
                
                console.log("ns_data=",ns.data);

                console.log("ネームスペースの数",ns.data.length);
                   const select_ns = [];   // セレクトボックス初期化　（エイリアスリンク/ネームスペース）

                   var body = document.getElementById("ns_table");

                   // <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
                   var tbl = document.createElement("table");
                   var tblBody = document.createElement("tbody");
                 
                   // すべてのセルを作成
                   for (var i = -1; i < ns.data.length; i++) {  // ネームスペースの数だけ繰り返す
                     // 表の行を作成
                     var row = document.createElement("tr");

                     for (var j = 0; j < 6; j++) {
                       // <td> 要素とテキストノードを作成し、テキストノードを
                       // <td> の内容として、その <td> を表の行の末尾に追加
                       var cell = document.createElement("td");                                                   
                          switch(j){
                            case 0:   //ネームスペースID
                              if (i === -1){
                                  var cellText = document.createTextNode("ネームスペース名");
                                  select_ns .push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
                                  break;
                              }                        
                              var cellText = document.createTextNode(Nnames1[i]);
                                 if (zip[0].height.compact() < ns.data[i].endHeight.compact() - grace_block){  // ステータスが無効なネームスペースを排除
                                    select_ns .push({value:Nnames1[i],name:Nnames1[i]}); //セレクトボックス用の連想配列を作る                              
                                 }    
                                  break;
                            case 1:   //ネームスペース名
                              if (i === -1){
                                  var cellText = document.createTextNode("ネームスペースID");
                                  break;
                              }                            
                              if (ns.data[i].levels.length === 1){ //　ルートネームスペースの時
                                  var cellText = document.createTextNode(ns.data[i].levels[0].id.toHex());
                              }else
                                 if (ns.data[i].levels.length === 2){ //  サブネームスペース1の時
                                     var cellText = document.createTextNode(ns.data[i].levels[1].id.toHex());
                                 }else
                                    if (ns.data[i].levels.length === 3){ //  サブネームスペース2の時
                                       var cellText = document.createTextNode(ns.data[i].levels[2].id.toHex());
                                    }
                                 break;  
                            case 2:   // 有効期限
                              if (i === -1){
                                  var cellText = document.createTextNode("更新期限");
                                  break;
                              }
                              if (ns.data[i].levels.length !== 1){
                                  var cellText = document.createTextNode("----------------");
                              }else{
                                  var cellText = document.createTextNode(ddNamespace[i]);
                              }
                              break; 
                            case 3: 
                              if (i === -1){
                                  var cellText = document.createTextNode("ステータス");
                                  break;
                              }                         
                              if (zip[0].height.compact() > ns.data[i].endHeight.compact() - grace_block){
                                  var cellText = document.createTextNode("　　❌");
                              }else
                                 if (zip[0].height.compact() < ns.data[i].endHeight.compact() - grace_block){
                                     var cellText = document.createTextNode("　　🟢");
                                 }
                              break;
                            case 4:   // エイリアスタイプ
                              if (i === -1){
                                  var cellText = document.createTextNode("タイプ");
                                  break;
                              }
                              if (ns.data[i].alias.type === 0){ 
                                  var cellText = document.createTextNode("--------");
                              }else
                                 if (ns.data[i].alias.type === 1){
                                  var cellText = document.createTextNode("Mosaic");
                                 }else
                                    if (ns.data[i].alias.type === 2){
                                        var cellText = document.createTextNode("Address");
                                    }
                              break;
                            case 5:   // エイリアス
                              if (i === -1){
                                  var cellText = document.createTextNode("🔗リンク🔗");
                                  break;
                              }
                              if (ns.data[i].alias.type === 0){ 
                                var cellText = document.createTextNode("--------------------------------------------------------");
                              }else
                                 if (ns.data[i].alias.type === 1){
                                     var cellText = document.createTextNode(ns.data[i].alias.mosaicId.id.toHex());
                                 }else
                                    if (ns.data[i].alias.type === 2){
                                        var cellText = document.createTextNode(ns.data[i].alias.address.address);
                                    }
                              break;    
                            }  
                       cell.appendChild(cellText);
                       row.appendChild(cell);
                     }                     
                     // 表の本体の末尾に行を追加
                     tblBody.appendChild(row);
                   }
                   // <tbody> を <table> の中に追加
                   tbl.appendChild(tblBody);
                   // <table> を <body> の中に追加
                   body.appendChild(tbl);
                   // tbl の border 属性を 2 に設定
                   tbl.setAttribute("border", "1");


                   console.log("%cselect_ns:","color: red",select_ns); // ネームスペース　セレクトボックス ///////

                   const jsSelectBox = document.querySelector('.Namespace_select');
                   let select = document.createElement('select');

                   select.classList.add('select1');
                   select_ns.forEach((v) => {
                     const option = document.createElement('option');
                     option.value = v.value;
                     option.textContent = v.name;
                     select.appendChild(option);
                   });
                   jsSelectBox.appendChild(select);


                   /////   Namespace セレクトボックス  (Metadata用）

                   const jsSelectBox_N = document.querySelector('.Namespace_select_N');
                   const select_N = document.createElement('select');

                   select_N.classList.add('select_N');
                   select_ns.forEach((v) => {
                     const option = document.createElement('option');
                     option.value = v.value;
                     option.textContent = v.name;
                     select_N.appendChild(option);
                   });
                   jsSelectBox_N.appendChild(select_N);
                
                                 
              });
            })
          });

    /////////////////////// Meta data テーブル　/////////////////////////////////////////////////////////////// 
                  
                 metaRepo
                 .search({
                  targetAddress: accountInfo.address,
                  pageNumber: 1,
                  pageSize: 50,
                  order: sym.Order.Desc
                }).subscribe(async data=>{
                  
                  console.log("data = = = =  ",data);

                  const select_Meta = [];   // セレクトボックス初期化　（Meta Key）

                  var body = document.getElementById("Meta_table");

                  // <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
                  var tbl = document.createElement("table");
                  var tblBody = document.createElement("tbody");
                
                  // すべてのセルを作成
                  for (var i = -1; i < data.data.length; i++) {  // ネームスペースの数だけ繰り返す
                    // 表の行を作成
                    var row = document.createElement("tr");

                    for (var j = 0; j < 6; j++) {
                      // <td> 要素とテキストノードを作成し、テキストノードを
                      // <td> の内容として、その <td> を表の行の末尾に追加
                      var cell = document.createElement("td");                                                   
                         switch(j){
                           case 0:   //Metadata Key
                             if (i === -1){
                                 var cellText = document.createTextNode("メタデータ キー");
                                 select_Meta.push({value:"",name:"新規 キー",type:"Type"}); //セレクトボックス用の連想配列を作る                       
                                 break;
                             }                        
                             var cellText = document.createTextNode(data.data[i].metadataEntry.scopedMetadataKey.toHex()); // scopedMetadataKey を 16進数に変換
                               if (i > -1){
                                 select_Meta.push({value:data.data[i].metadataEntry.scopedMetadataKey.toHex(),name:data.data[i].metadataEntry.scopedMetadataKey.toHex(),type:data.data[i].metadataEntry.metadataType}); //セレクトボックス用の連想配列を作る                              
                               }     
                                 break;
                           case 1:   //タイプ
                             if (i === -1){
                                var cellText = document.createTextNode("タイプ");
                                break;
                             }
                             if (data.data[i].metadataEntry.metadataType === 0){
                                var cellText = document.createTextNode("Account");
                             }else
                                if (data.data[i].metadataEntry.metadataType === 1){
                                   var cellText = document.createTextNode("Mosaic");
                                }else
                                   if (data.data[i].metadataEntry.metadataType === 2){
                                      var cellText = document.createTextNode("Namespace"); 
                                   }     
                               break;  
                           case 2:   // 対象ID
                             if (i === -1){
                                var cellText = document.createTextNode("モザイク ID / ネームスペース");
                                break;
                             }   
                        //  console.log("対象ID＝＝＝",data.data[i].metadataEntry.targetId.id);
                             if (data.data[i].metadataEntry.targetId === undefined){                                       
                                var cellText = document.createTextNode("N/A");      
                             }else
                                if(data.data[i].metadataEntry.targetId !== undefined){
                                  if (data.data[i].metadataEntry.metadataType === 1){  // モザイクの場合　ID
                                      var cellText = document.createTextNode(data.data[i].metadataEntry.targetId.id.toHex());                                 
                                  }else
                                     if (data.data[i].metadataEntry.metadataType === 2){ // ネームスペースがある場合、ID → ネームスペースに変換                                             
                                           var ns_name = await nsRepo.getNamespacesNames([data.data[i].metadataEntry.targetId.id]).toPromise(); 
                                           if (ns_name.length === 1){
                                               var cellText = document.createTextNode([ns_name][0][0].name);
                                           }else
                                              if (ns_name.length === 2){                                                    
                                                  var cellText = document.createTextNode([ns_name][0][1].name + "." + [ns_name][0][0].name);
                                              }else
                                                 if (ns_name.length === 3){
                                                     var cellText = document.createTextNode([ns_name][0][2].name + "." + [ns_name][0][1].name + "." + [ns_name][0][0].name);
                                                 }
                                     }
                               }
                               break;  
                           case 3:   // value
                             if (i === -1){
                                 var cellText = document.createTextNode(" 　　Value(値)");
                                break;
                             } 
                               // if (isHexadecimal(data.data[i].metadataEntry.value) === true){  // 16進数文字列の場合　UTF-８に変換する
                               //   value1 = sym.Convert.decodeHex(data.data[i].metadataEntry.value);
                               //   var cellText = document.createTextNode(value1);
                               //  }else{
                                  var cellText = document.createTextNode(data.data[i].metadataEntry.value); 
                               // }
                               // console.log("%cメタデータエントリー中身","color: red",data.data[i]);                  
                                break;        
                           case 4:  // 送信者アドレス
                             if (i === -1){
                                 var cellText = document.createTextNode("送信者アドレス");
                                 break;
                             }                         
                                 var cellText = document.createTextNode(data.data[i].metadataEntry.sourceAddress.address);
                                 break; 
                           case 5:   // 対象アドレス
                             if (i === -1){
                                 var cellText = document.createTextNode("対象アドレス");
                                 break;
                             }
                                 var cellText = document.createTextNode(data.data[i].metadataEntry.targetAddress.address);  
                             break;    
                              
                           }  
                      cell.appendChild(cellText);
                      row.appendChild(cell);
                    }                     
                    // 表の本体の末尾に行を追加
                    tblBody.appendChild(row);
                  }
                  // <tbody> を <table> の中に追加
                  tbl.appendChild(tblBody);
                  // <table> を <body> の中に追加
                  body.appendChild(tbl);
                  // tbl の border 属性を 2 に設定
                  tbl.setAttribute("border", "1");


                  console.log("%cselect_Meta:","color: red",select_Meta); // Metadata　セレクトボックス ///////

                  const jsSelectBox = document.querySelector('.Meta_select');
                  const select = document.createElement('select');

                  select.classList.add('select_Meta');
                  select_Meta.forEach((v) => {
                    const option = document.createElement('option');
                    option.value = v.value;
                    option.textContent = v.name;
                    select.appendChild(option);
                  });
                  jsSelectBox.appendChild(select);       
                                    
                });  
   

    ///////////////////////////////////////////////////////////////////////////////////////////////////////// 

          //select要素を取得する
          const selectMosaic = document.getElementById('form-mosaic_ID');
          const select_mosaic = []; // セレクトボックス初期化 　agg用
             
    
    (async() => {
      for (let m of accountInfo.mosaics) {  //accountInfo のモザイクの数だけ繰り返す
           mosaicInfo = await mosaicRepo.getMosaic(m.id.id).toPromise();// 可分性の情報を取得する
           const div = mosaicInfo.divisibility;
           //option要素を新しく作る
           const option1 = document.createElement('option');
          
           const mosaicNamesA = await nsRepo.getMosaicsNames([new sym.MosaicId(m.id.id.toHex())]).toPromise(); //モザイクIDからネームスペースを取り出す

         if ([mosaicNamesA][0][0].names.length !== 0) {  //  ネームスペースがある場合
        
            option1.value =   m.id.id.toHex();  // セレクトボックスvalue
            option1.textContent = `${[mosaicNamesA][0][0].names[0].name} :　${(parseInt(m.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })}`;  // セレクトボックスtext

            select_mosaic.push({value:m.id.id.toHex(),name:`${[mosaicNamesA][0][0].names[0].name} :　${(parseInt(m.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })}`});  // agg用
                       
         }else{   //ネームスペースがない場合
              
               option1.value =   m.id.id.toHex();  // セレクトボックスvalue
               option1.textContent = `${m.id.id.toHex()} :　${(parseInt(m.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })}`; // セレクトボックスtext  
               
               select_mosaic.push({value:m.id.id.toHex(),name:`${m.id.id.toHex()} :　${(parseInt(m.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })}`});  //  agg用
         }   
  
         if (m.id.id.toHex() === XYM_ID) {
            const dom_xym = document.getElementById('wallet-xym')
            dom_xym.innerHTML = `<i>XYM Balance : ${(parseInt(m.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })}　</i>`
         }
                // console.log("%coption1=","color: red",option1);
           //select要素にoption要素を追加する
          selectMosaic.appendChild(option1);   
	      
	      // nftdrive(m);
      }    
    
      /////   Mosaic セレクトボックス  (送信 mosaic用）

      const jsSelectBox_m = document.querySelector('.mosaic_ID2');
      const select_m1 = document.createElement('select');

      select_m1.classList.add('select_m1');
      select_mosaic.forEach((v) => {
        const option = document.createElement('option');
        option.value = v.value;
        option.textContent = v.name;
        select_m1.appendChild(option);
      });
      jsSelectBox_m.appendChild(select_m1);
    })(); // async()
     
  })


      
 //////////////////////////////////////　リスナーでトランザクションを検知し、音を鳴らす //////////////////////////////////////////////////
  
 
 // nsRepo = repo.createNamespaceRepository();
  
  wsEndpoint = NODE.replace('http', 'ws') + "/ws";
  listener = new sym.Listener(wsEndpoint,nsRepo,WebSocket); 
  
  listener.open().then(() => {

    //Websocketが切断される事なく、常時監視するために、ブロック生成(約30秒毎)の検知を行う

    // ブロック生成の検知  /////////////////////////////////////////////////////////////////
    listener.newBlock()
    .subscribe(block=>{
    //  console.log(block);    //ブロック生成 　表示OFF
    });
           
    // 未承認トランザクションの検知  ////////////////////////////////////////////////////////
    listener.unconfirmedAdded(address)
    .subscribe(tx=>{
        //受信後の処理を記述
        console.log(tx);
        // 未承認トランザクション音を鳴らす
        var my_audio = new Audio("./src/ding.ogg");
        my_audio.currentTime = 0;  //再生開始位置を先頭に戻す
        my_audio.play();  //サウンドを再生 
         var popup = document.getElementById('popup'); //ポップアップを表示
             popup.classList.toggle('is-show'); 
    });    
         
    // 承認トランザクションの検知  //////////////////////////////////////////////////////////
    listener.confirmed(address)
    .subscribe(tx=>{
        //受信後の処理を記述
        console.log(tx);
         // 承認音を鳴らす   
        var my_audio = new Audio("./src/ding2.ogg");
        my_audio.currentTime = 0;  //再生開始位置を先頭に戻す      
        my_audio.play();  //サウンドを再生
        var popup = document.getElementById('popup'); // ポップアップを閉じる
             popup.classList.toggle('is-show');
             var audio = new Audio('./src/ventus.mp3');
             audio.play();
        window.setTimeout(function(){location.reload();},6000); // 6秒後にページをリロード
    });
  
  });

	
 //////////////////////////////////////  トランザクション履歴を取得する  //////////////////////////////////////////////////////////////////////////////
                                
  
 const searchCriteria = {                                   
   group: sym.TransactionGroup.Confirmed,
   address,
   pageNumber: 1,
   pageSize: 50,
   order: sym.Order.Desc,
   embedded: false,
 };
	         
 console.log("searchCriteria=",searchCriteria);  //////////////////
 console.log("txRepo=",txRepo);   //////////////////

 const dom_txInfo = document.getElementById('wallet-transactions'); 
 console.log("dom_txInfo=",dom_txInfo);  

 txRepo
  .search(searchCriteria)
  .subscribe(async txs => {
    console.log("txs=",txs);         /////////////////
        
    let t=1;
    let en = new Array(searchCriteria.pageSize);
    
    for (let tx of txs.data) {   ///////////////    tx を pageSize の回数繰り返す ///////////////////
         
         const dom_tx = document.createElement('div');
         const dom_date = document.createElement('div');
         const dom_txType = document.createElement('div');
         const dom_hash = document.createElement('div');
         const dom_signer_address = document.createElement('div');
         const dom_recipient_address = document.createElement('div');
      
         const dom_enc = document.createElement('div');
         const dom_message = document.createElement('div');
         const dom_namespace = document.createElement('div');
         //const dom_mosaic = document.createElement('div');
         const dom_account = document.createElement('div');
         const dom_restriction = document.createElement('div');
         const dom_NFT = document.createElement('div');
	    
         dom_txType.innerHTML = `<p style="text-align: right; line-height:100%;&"><font color="#0000ff">< ${getTransactionType(tx.type)} ></font></p>`;        //　 　Tx Type
                 
         // dom_hash.innerHTML = `<p style="text-align: right"><button type="button" class="button-txinfo"><a href="${EXPLORER}/transactions/${tx.transactionInfo.hash}" target="_blank" rel="noopener noreferrer"><i>⛓ Transaction Info ⛓</i></a></button></p>`; //Tx hash
         dom_hash.innerHTML = `<p style="text-align: right"><button type="button" class="button-txinfo" id="${EXPLORER}/transactions/${tx.transactionInfo.hash}" onclick="transaction_info(this.id);"><i>⛓ Transaction Info ⛓</i></a></button></p>`; //Tx hash 
        
         dom_signer_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">From : ${tx.signer.address.address}</font><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${tx.signer.address.address}" onclick="Onclick_Copy(this.id);" /></div>`;    //  送信者 アドレス
               
          
           ////////////////////////////////////////////　　  　timestamp to Date 　　　　　/////////////////////////
           const timestamp = epochAdjustment + (parseInt(tx.transactionInfo.timestamp.toHex(), 16)/1000);   /////////////// Unit64 を 16進数に　変換したあと10進数に変換　
           const date = new Date(timestamp * 1000);
      
           const yyyy = `${date.getFullYear()}`;
           // .slice(-2)で文字列中の末尾の2文字を取得する
           // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
           const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
           const dd = `0${date.getDate()}`.slice(-2);
           const HH = `0${date.getHours()}`.slice(-2);
           const mm = `0${date.getMinutes()}`.slice(-2);
           const ss = `0${date.getSeconds()}`.slice(-2);

           const ymdhms = `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
      
           //console.log(ymdhms);  // 日時を表示
      
           dom_date.innerHTML = `<font color="#7E00FF"><p style="text-align: right">${ymdhms}</p></font>`;    //　日付  右寄せ
           ///////////////////////////////////////////////////////////////////////////////////////////////////////
         
           dom_tx.appendChild(dom_hash);                      // dom_hash(⛓Transacrion info⛓) をdom_txに追加
           dom_tx.appendChild(dom_date);                      // dom_date(日付)　をdom_txに追加           	        
           dom_tx.appendChild(dom_txType);                    // dom_txType(Txタイプ) をdom_txに追加         
           dom_tx.appendChild(dom_signer_address);            // dom_signer_address(送信者アドレス) をdom_txに追加  
	    
          //  ----------------------------------------------------------------  //

          if (tx.type === 16724){ // tx.type が 'TRANSFER' の場合    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
	            if (tx.recipientAddress.address === undefined){  // 宛先が Namespace の場合 NamespaceId から取得し表示する
                    (async() => {    
	                      //let namespacesNames = await nsRepo.getNamespacesNames([sym.NamespaceId.createFromEncoded(tx.recipientAddress.id.toHex())]).toPromise();
                          const namespaceName = await nsRepo.getNamespace(tx.recipientAddress.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック
                        if (namespaceName !== undefined){  
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          }
		                      dom_recipient_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">To　: <a href="${EXPLORER}/namespaces/${name1}" target="_blank" rel="noopener noreferrer">${name1}</a><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${name1}" onclick="Onclick_Copy(this.id);" /></div></font>`; //  文字列の結合　   宛先                       
                        }else{
                          dom_namespace.innerHTML =`<font color="#ff6347"><big>To:　Namespace 期限切れ</big></font>`;                          
                        }
                    })(); // async() 
	            }else{   // Nから始まるの39文字のアドレスの場合はそのままアドレスを表示
                   dom_recipient_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">To　:   ${tx.recipientAddress.address}</font><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${tx.recipientAddress.address}" onclick="Onclick_Copy(this.id);" /></div>`; //  文字列の結合　   宛先
	            }	
	            dom_tx.appendChild(dom_recipient_address);         // dom_recipient_address をdom_txに追加
            
              //console.log('Tx_Mosaics =',tx.mosaics.length);  ///  モザイクの数を表示 ///////////////////////////////////////////
                  
              /////////// モザイクが空ではない場合   /////////////////　　モザイクが空の場合はこの for 文はスルーされる  //////////
              for(let i=0; i<tx.mosaics.length; i++){  //モザイクの数だけ繰り返す
                  const dom_mosaic = document.createElement('div');  
                  const dom_amount = document.createElement('div');
                  const dom_mosaic_img = document.createElement('div');                  
          
               (async() => {
                  let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(tx.mosaics[i].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
		       
                  mosaicInfo = await mosaicRepo.getMosaic(tx.mosaics[i].id.id).toPromise();// 可分性の情報を取得する                     
                  let div = mosaicInfo.divisibility; // 可分性      
                  
                       if(tx.signer.address.address === address.address) {  // 署名アドレスとウォレットのアドレスが同じ場合　 
                      
                          if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                              dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`; 
                          }else{   　　　　　　　　　　　　　　　　　　　　　 //　ネームスペースがない場合
                              dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<strong>${tx.mosaics[i].id.id.toHex()}</strong></font>`;
                          }    
                          dom_amount.innerHTML = `<font color="#FF0000" size="+1">💁‍♀️➡️💰 :　<i><big><strong> ${(parseInt(tx.mosaics[i].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量

                       }else{     //  署名アドレスとウォレットアドレスが違う場合
                           if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                           }else{ 　　　　　　　　　　　　　　　　　　　　　  // ネームスペースがない場合
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${tx.mosaics[i].id.id.toHex()}</strong></font>`;   
                                // console.log("%cdom_mosaic====","color: red",tx.mosaics[i].id.id.toHex(),i);                            
                           }                           
                           dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(tx.mosaics[i].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                       }
		            // console.log("%ci モザイクが空では無い場合の処理　iだよ　",'color: red',i);                
                 
                })(); // async() 
               
                nftdrive(tx.mosaics[i].id,dom_NFT); // nftdrive NFT画像表示
                comsa(tx.mosaics[i].id,dom_NFT);    // comsa NFT画像表示

                let xhr = new XMLHttpRequest();     // mosaic-center の画像を表示
                xhr.open("GET",`https://mosaic-center.tk/db/api.php?mode=search&mosaicid=${tx.mosaics[i].id.toHex()}`,false);  

                let data;
                xhr.send(null);
                if (xhr.status == 200) {
                    data = xhr.response;
                    data = JSON.parse(data);
                  if (data !== null){
                    let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(tx.mosaics[i].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
                    if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                      dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${[mosaicNames][0][0].names[0].name}</a><br><br>`
                    }else{                                       // ネームスペースがない場合
                      dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${data[0][2]}</a><br><br>`
                    }
                  }
                }else{
                     console.log(`Error: ${xhr.status}`);
                }

                dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加
                dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加
                dom_tx.appendChild(dom_NFT);                       // dom_NFT をdom_txに追加
                dom_tx.appendChild(dom_mosaic_img);                // dom_mosaic_img をdom_txに追加 
                                
              }  //モザイクの数だけ繰り返す
             //})(); // async() 
	
             if (tx.mosaics.length === 0){   // モザイクが空の場合  //////////////　モザイクがある場合はこの if 文はスルーされる
                  const dom_mosaic = document.createElement('div');
                  const dom_amount = document.createElement('div');
                  
                   if(tx.signer.address.address === address.address) {  // 署名アドレスとウォレットのアドレスが同じ場合
                       dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　No mosaic</font>`;     // No mosaic
                       dom_amount.innerHTML = `<font color="#FF0000">💁‍♀️➡️💰 : </font>`;     // 　数量
                   }else{          //  署名アドレスとウォレットアドレスが違う場合
                         dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　No mosaic</font>`;     // No mosaic
                         dom_amount.innerHTML = `<font color="#008000">💰➡️😊 : </font>`;     // 　数量        
                   } 
                   dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
		               dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加
             }     /////////////////////////////////////////////////////////////////////////////////////////////////////    
                     
             if (tx.message.type === 1){   // メッセージが暗号文の時          
	               let alice;
		             let PubKey;
                 let enc_message1 = {};
                 dom_enc.innerHTML = `<font color="#ff00ff"><strong></br><ul class="decryption">暗号化メッセージ</strong>　< Encrypted Message ></font>`;     // 暗号化メッセージの場合
		     
                 dom_tx.appendChild(dom_enc);

               (async() => { 

                if (tx.recipientAddress.address !== undefined){ //送信先のアドレスが、39文字のアドレスの場合

                   if (tx.recipientAddress.address !== tx.signer.address.address){    // 送信先アドレスと、送信元アドレスが異なる場合  ///////////////////////////////
                     if (tx.signer.address.address === address.address){   // 署名アドレスと、ウォレットアドレスが同じ場合
                     alice = sym.Address.createFromRawAddress(tx.recipientAddress.address);   //アドレスクラスの生成
      
                     }else
                        if (tx.recipientAddress.address === address.address){ // 送信先アドレスと、ウォレットアドレスが同じ場合
                             alice = sym.Address.createFromRawAddress(tx.signer.address.address);   //アドレスクラスの生成			
                        } 
            
                   }else{    // 送信先アドレスと、ウォレットアドレスが同じ場合
                              alice = sym.Address.createFromRawAddress(tx.recipientAddress.address);   //アドレスクラスの生成
                              PubKey = window.SSS.activePublicKey;
                   }

                }else{  //送信先のアドレスが、ネームスペースの場合
                   const to_address = await nsRepo.getLinkedAddress(tx.recipientAddress.id).toPromise();

		               if (to_address.address !== tx.signer.address.address){    // 送信先アドレスと、送信元アドレスが異なる場合  ///////////////////////////////
			               if (tx.signer.address.address === address.address){   // 署名アドレスと、ウォレットアドレスが同じ場合
			               alice = sym.Address.createFromRawAddress(tx.recipientAddress.address);   //アドレスクラスの生成
				
			               }else
                        if (to_address.address === address.address){ // 送信先アドレスと、ウォレットアドレスが同じ場合
			                       alice = sym.Address.createFromRawAddress(tx.signer.address.address);   //アドレスクラスの生成			
			                  } 
			 			 
		               }else{    // 送信先アドレスと、ウォレットアドレスが同じ場合
			                        alice = sym.Address.createFromRawAddress(to_address.address);   //アドレスクラスの生成
		                          PubKey = window.SSS.activePublicKey;
		               }                                                                       
                }   
		                       accountRepo.getAccountInfo(alice).toPromise().then((accountInfo) => { //  アドレスから公開鍵を取得する
			                     PubKey = accountInfo.publicKey;  
		                       enc_message1.message = tx.message.payload;
		                       enc_message1.PubKey = PubKey;	     	      		       
		                       en[t] = enc_message1; 
		                       // console.table(en);
		       		       
	                         dom_message.innerHTML = `<input type="button" id="${PubKey}" value="${tx.message.payload}" onclick="Onclick_Decryption(this.id, this.value);" class="button-decrypted"/></div>`;     // 　メッセージ
                           dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加                                                              
                           dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く    
               
	                     }); //公開鍵を取得
               })(); // async() 
	           }else{          // 平文の場合
                 dom_message.innerHTML = `<font color="#4169e1"></br>< Message ></br>${tx.message.payload}</font>`;     // 　メッセージ
                 dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加                                                              
                 dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
             }	   
          } // tx.type が 'TRANSFER' の場合

          //  ----------------------------------------------------------------  //

	        if (tx.type === 16718){       // tx.type が 'NAMESPACE_REGISTRATION' の場合	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	           if (tx.registrationType === 0){
              dom_namespace.innerHTML = `<font color="#008b8b">root Namespace 登録 :　<big><strong>${tx.namespaceName}</strong></big></font>`; 
             }else
                if (tx.registrationType === 1){
              dom_namespace.innerHTML = `<font color="#008b8b">sub Namespace 登録 :　<big><strong>${tx.namespaceName}</strong></big></font>`; 
             }
	            dom_tx.appendChild(dom_namespace);                 // namespaceをdom_txに追加
              dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加                                                              
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く          	  		  		  	  
	        }
          //  ----------------------------------------------------------------  //

          if (tx.type === 17229){       // tx.type が 'MOSAIC_SUPPLY_REVOCATION' の場合	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const dom_mosaic = document.createElement('div');
            const dom_amount = document.createElement('div');
    
           (async() => {
              let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(tx.mosaic.id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
     
              mosaicInfo = await mosaicRepo.getMosaic(tx.mosaic.id.id).toPromise();// 可分性の情報を取得する                     
              let div = mosaicInfo.divisibility; // 可分性      
               
                       if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                            dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                       }else{ 　　　　　　　　　　　　　　　　　　　　　  // ネームスペースがない場合
                             dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<strong>${tx.mosaic.id.id.toHex()}</strong></font>`;
                       }
                       dom_amount.innerHTML = `<font color="#3399FF" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(tx.mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量                
           })(); // async() 
         
            dom_recipient_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">回収先 :　${tx.sourceAddress.address}</font><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${tx.sourceAddress.address}" onclick="Onclick_Copy(this.id);" /></div>`;
            dom_tx.appendChild(dom_recipient_address);
            dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
            dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加                                                           
            dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く          	  		  		  	  
        }
          //  ----------------------------------------------------------------  // 

          if (tx.type === 16973){       // tx.type が 'MOSAIC_SUPPLY_CHANGE' の場合	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
             const dom_mosaic = document.createElement('div');
             if (tx.action === 0){
                 dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　${tx.mosaicId.toHex()}　<br><big><strong> 減少　⬇️　${parseInt(tx.delta.toHex(),16)}</strong></big></font>`;
             }else
                if (tx.action === 1){
                   dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　${tx.mosaicId.toHex()}　<br><big><strong> 増加　⬆️　${parseInt(tx.delta.toHex(),16)}</strong></big></font>`;
                }
                dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }

          //  ----------------------------------------------------------------  //

          if (tx.type === 16974){       // tx.type が 'ADDRESS_ALIAS' の場合   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
           (async() => {
              let alias_Action; 
              if (tx.aliasAction === 1){
                alias_Action = "Link";
               }else
                  if(tx.aliasAction === 0){
                alias_Action = "Unlink";
               } 
             // let namespacesNames = await nsRepo.getNamespacesNames([sym.NamespaceId.createFromEncoded(tx.namespaceId.id.toHex())]).toPromise();
                          const namespaceName = await nsRepo.getNamespace(tx.namespaceId.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック;
                        if (namespaceName !== undefined){  
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          } 	  
                          dom_namespace.innerHTML = `<font color="#008b8b">Namespace エイリアス <strong>${alias_Action}</strong></br></br>Namespace : <strong>${name1} </strong></br>Address : </br><strong>${tx.address.address}</strong></font>`; 
                        }else{
                          dom_namespace.innerHTML =`<font color="#ff6347"><big>Namespace 期限切れ</big></font>`;
                        }  
              dom_tx.appendChild(dom_namespace);                 // dom_namespaceをdom_txに追加                                                             
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
            })(); // async()           	  		  		  	  
          }
          //  ----------------------------------------------------------------  //

          if (tx.type === 17230){       // tx.type が 'MOSAIC_ALIAS' の場合	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            (async() => {
              let alias_Action; 
              if (tx.aliasAction === 1){
                alias_Action = "Link";
               }else
                  if(tx.aliasAction === 0){
                alias_Action = "Unlink";
               }
             // let namespacesNames = await nsRepo.getNamespacesNames([sym.NamespaceId.createFromEncoded(tx.namespaceId.id.toHex())]).toPromise();
                        const namespaceName = await nsRepo.getNamespace(tx.namespaceId.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック;
                        if (namespaceName !== undefined){  
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          }
                          dom_namespace.innerHTML = `<font color="#008b8b">Mosaic エイリアス <strong>${alias_Action}</strong></br></br>Namespace : <strong>${name1} </strong></br>MosaicID : <strong>${tx.mosaicId.id.toHex()}</strong></font>`;
                        }else{
                          dom_namespace.innerHTML =`<font color="#ff6347"><big>Namespace 期限切れ</big></font>`;
                        }

              dom_tx.appendChild(dom_namespace);                  // dom_namespaceをdom_txに追加                                                               
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く   
            })(); // async()          	  		  		  	  
          }
	        //  ----------------------------------------------------------------  //

          if (tx.type === 16720){       // tx.type が 'ACCOUNT_ADDRESS_RESTRICTION' の場合	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////              
              if (tx.restrictionFlags === 1){
                   restriction_type = "指定アドレスからのみ受信許可";
                   res_Flag = "　　　　　　　　　➡️🟢";
              }
              if (tx.restrictionFlags === 16385){
                   restriction_type = "指定アドレス宛のみ送信許可";
                   res_Flag = "　　　　　　　　　🟢➡️";
              }
              if (tx.restrictionFlags === 32769){
                   restriction_type = "指定アドレスからの受信拒否";
                   res_Flag = "　　　　　　　　　➡️❌";
              }
              if (tx.restrictionFlags === 49153){
                   restriction_type = "指定アドレス宛への送信禁止";
                   res_Flag = "　　　　　　　　　❌➡️";
              }   

              if (tx.restrictionAdditions.length !== 0){   // 制限追加
                dom_restriction.innerHTML = `<font color="#ff4500"><strong>⚠️アカウントアドレス制限　追加</strong></font>
                <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                <br>${res_Flag}
                <br>アドレス : <strong>${tx.restrictionAdditions[0].address}</strong></font>`
              }

              if (tx.restrictionDeletions.length !== 0){   // 制限削除
                 dom_restriction.innerHTML = `<font color="#3399FF"><strong>⚠️アカウントアドレス制限　削除</strong></font>
                 <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                 <br>${res_Flag}
                 <br>アドレス : <strong>${tx.restrictionDeletions[0].address}</strong></font>`
              }

              dom_tx.appendChild(dom_restriction);               // dom_restrictionをdom_txに追加
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }
          //  ----------------------------------------------------------------  //

          if (tx.type === 16976){       // tx.type が 'ACCOUNT_MOSAIC_RESTRICTION' の場合	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              if (tx.restrictionFlags === 2){
                  restriction_type = "指定モザイクを含むトランザクションのみ受信許可";
                  res_Flag = "　　　　　　　　　➡️🟢";
              }
              if (tx.restrictionFlags === 32770){
                restriction_type = "指定モザイクを含むトランザクションを受信拒否";
                res_Flag = "　　　　　　　　　➡️❌";
              }

              if (tx.restrictionAdditions.length !== 0){   // 制限追加
                 dom_restriction.innerHTML = `<font color="#ff4500"><strong>⚠️アカウントモザイク制限　追加</strong></font>
                 <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                 <br>${res_Flag}
                 <br>モザイクID : <strong>${tx.restrictionAdditions[0].id.toHex()}</strong></font>`
              }

              if (tx.restrictionDeletions.length !== 0){   // 制限削除
                dom_restriction.innerHTML = `<font color="#3399FF"><strong>⚠️アカウントモザイク制限　削除</strong></font>
                <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                <br>${res_Flag}
                <br>モザイクID : <strong>${tx.restrictionDeletions[0].id.toHex()}</strong></font>`
             }

              dom_tx.appendChild(dom_restriction);               // dom_restrictionをdom_txに追加
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }
          //  ----------------------------------------------------------------  //

          if (tx.type === 17232){       // tx.type が 'ACCOUNT_OPERATION_RESTRICTION' の場合	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              if (tx.restrictionFlags === 16388){
                  restriction_type = "指定トランザクションの送信のみ許可";
                  res_Flag = "　　　　　　　　　🟢➡️";
              }
              if (tx.restrictionFlags === 49156){
                  restriction_type = "指定トランザクションの送信を禁止";
                  res_Flag = "　　　　　　　　　❌➡️";
              }

              dom_restriction.innerHTML = `<font color="#ff4500"><strong>⚠️アカウントトランザクション制限</strong></font>
              <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
              <br>${res_Flag}
              <br>Tx タイプ : <strong>${getTransactionType(tx.restrictionAdditions[0])}</strong></font>`
             
              dom_tx.appendChild(dom_restriction);               // dom_restrictionをdom_txに追加
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }
          //  ----------------------------------------------------------------  //

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        if (tx.type === 16961 || tx.type === 16705){      // tx.type が 'AGGREGATE_BONDED'　または 'AGGREGATE_COMPLETE' の場合		///////////////////////////////////////////////////////////////////////////////////////////////
           (async() => {      		      
                     const aggTx = await txRepo.getTransactionsById([tx.transactionInfo.hash],sym.TransactionGroup.Confirmed).toPromise();
                     console.log('%c///////////////////////////////','color: green');
		                 console.log(`%caggTx  ( ${ymdhms} )`,"color: blue",aggTx[0]);
                                                         	                                                                              
                 const dom_amount = document.createElement('div');
          
    		        if (aggTx[0].innerTransactions[0].type === 16724){  // TRANSFER の場合
                     
                     const dom_aggTx = document.createElement('div');
                     const dom_mosaic = document.createElement('div'); 
                     const dom_NFT = document.createElement('div');
                     const dom_mosaic_img = document.createElement('div');

                     let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
     
                     mosaicInfo = await mosaicRepo.getMosaic(aggTx[0].innerTransactions[0].mosaics[0].id.id).toPromise();// 可分性の情報を取得する                     
                     let div = mosaicInfo.divisibility; // 可分性
                             
                          if (aggTx[0].innerTransactions[0].signer.address.address === address.address){  // 署名アドレスとウォレットのアドレスが同じ場合　
                      
                             if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                                 dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`; 
                             }else{                                       //　ネームスペースがない場合
                                  dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex()}</strong></font>`;
                             }    
                             dom_amount.innerHTML = `<font color="#FF0000" size="+1">💁‍♀️➡️💰 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaics[0].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量

                          }else{     //  署名アドレスとウォレットアドレスが違う場合
                             if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                                 dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                             }else{                                      // ネームスペースがない場合
                                   dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex()}</strong></font>`;                                  
                             }
                             dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaics[0].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
		                      }

                          if (aggTx[0].innerTransactions[0].message !== undefined){     // １つ目、2つ目のインナートランザクションにメッセージがあれば表示する。
                              dom_message.innerHTML = `<font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[0].message.payload}</font>`;     // 　メッセージ
                              if (aggTx[0].innerTransactions[0].message.payload === `{"version":"comsa-nft-1.0"}` || aggTx[0].innerTransactions[0].message.payload === `{"version":"comsa-nft-1.1"}`){
                               // dom_NFT.innerHTML = `<font color="#4169e1">< Mosaic ID ></br>${aggTx[0].innerTransactions[1].mosaics[0].id.id.toHex()}`;
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[1].mosaics[0].id.id.toHex()}</strong></font>`;
                                dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[1].mosaics[0].amount.toHex(), 16)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量 
                                comsa(aggTx[0].innerTransactions[1].mosaics[0].id,dom_NFT); // comsa NFT画像表示
                              }
                              if (aggTx[0].innerTransactions[0].message.payload === `{"version":"comsa-ncft-1.1"}`){
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[1].mosaics[0].id.id.toHex()}</strong></font>`;
                                dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[1].mosaics[0].amount.toHex(), 16)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                                comsaNCFT(aggTx[0].innerTransactions[1].mosaics[0].id,dom_NFT); // comsa NCFT画像表示
                              }
                          }else
                             if (aggTx[0].innerTransactions[1].message !== undefined){
                                 dom_message.innerHTML = `<font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[1].message.payload}</font>`;     // メッセージ
                             }
                        
                        dom_aggTx.innerHTML = `<font color="#FF00FF">aggTx(${aggTx[0].innerTransactions.length})　${getTransactionType(aggTx[0].innerTransactions[0].type)}</font>`;  // アグリの数　と　Type

                        nftdrive(aggTx[0].innerTransactions[0].mosaics[0].id,dom_NFT); // nftdrive NFT画像表示 


                        let xhr = new XMLHttpRequest();     // mosaic-center の画像を表示
                        xhr.open("GET",`https://mosaic-center.tk/db/api.php?mode=search&mosaicid=${aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex()}`,false);  

                        let data;
                        xhr.send(null);
                        if (xhr.status == 200) {
                           data = xhr.response;
                           data = JSON.parse(data);
                           if (data !== null){
                            let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
                            if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                              dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${[mosaicNames][0][0].names[0].name}</a><br><br>`
                            }else{                                       // ネームスペースがない場合
                              dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${data[0][2]}</a><br><br>`
                            }
                           }
                        }else{
                              console.log(`Error: ${xhr.status}`);
                        }
 
                        dom_tx.appendChild(dom_aggTx);                     // dom_aggTx をdom_txに追加
                        dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                        dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加
                        dom_tx.appendChild(dom_NFT);                    // dom_NFT をdom_txに追加
                        dom_tx.appendChild(dom_mosaic_img);                // dom_mosaic_img をdom_txに追加
	              }   

                if (aggTx[0].innerTransactions[0].type === 16717){ // MOSAIC_REGISTRATION の場合
                    const dom_mosaic = document.createElement('div');
                    dom_mosaic.innerHTML = `<font color="#008b8b">Mosaic 登録 :　<big><strong>${aggTx[0].innerTransactions[0].mosaicId.id.toHex()}</strong></big></font>`; 
                    dom_tx.appendChild(dom_mosaic);                  // dom_mosaicをdom_txに追加
                }

                if (aggTx[0].innerTransactions[0].type === 16708){ // ACCOUNT_METADATAの場合
                    dom_account.innerHTML = `<font color="#ff6347"><big>METADATA登録 :　　Account</font><br><strong><font color="#008b8b"> Key :　${aggTx[0].innerTransactions[0].scopedMetadataKey.toHex()}<br>Address : ${window.SSS.activeAddress}</strong></big></font>`; 
                    dom_tx.appendChild(dom_account);
                }

                if (aggTx[0].innerTransactions[0].type === 16964){ // MOSAIC_METADATA の場合
                    const dom_mosaic = document.createElement('div');
                    dom_mosaic.innerHTML = `<font color="#ff6347"><big>METADATA登録 :　　Mosaic </font><br><strong><font color="#008b8b"> Key :　${aggTx[0].innerTransactions[0].scopedMetadataKey.toHex()}<br>Mosaic ID: 　${aggTx[0].innerTransactions[0].targetMosaicId.toHex()}</strong></big></font>`;
                    dom_tx.appendChild(dom_mosaic);                  // dom_mosaicをdom_txに追加      
                } 

                if (aggTx[0].innerTransactions[0].type === 17220){ // NAMESPACE_METADATA
                    //var ns_name_Meta = await nsRepo.getNamespacesNames([aggTx[0].innerTransactions[0].targetNamespaceId.id]).toPromise();
                          const namespaceName = await nsRepo.getNamespace(aggTx[0].innerTransactions[0].targetNamespaceId.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック
                        //  console.log("1257==",namespaceName);
                        if (namespaceName !== undefined){
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          }
                          dom_namespace.innerHTML = `<font color="#ff6347"><big>METADATA登録 :　　Namespace</font><br><strong><font color="#008b8b"> Key :　${aggTx[0].innerTransactions[0].scopedMetadataKey.toHex()}<br>Namespace :　${name1}</strong></big></font>`; 
                        }else{
                              dom_namespace.innerHTML =`<font color="#ff6347"><big>Namespace 期限切れ</big></font>`;
                        }
                    dom_tx.appendChild(dom_namespace);                  // dom_namespaceをdom_txに追加
                }

                if (aggTx[0].innerTransactions[0].type === 16722){ // SECRET_LOCK
                    const dom_aggTx = document.createElement('div');                                                                                                     
                    if (aggTx[0].innerTransactions[0].mosaic !== undefined){   
                         const dom_mosaic = document.createElement('div');                  
                         let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaic.id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
     
                          mosaicInfo = await mosaicRepo.getMosaic(aggTx[0].innerTransactions[0].mosaic.id.id).toPromise();// 可分性の情報を取得する                     
                          let div = mosaicInfo.divisibility; // 可分性
                  
                          if(aggTx[0].innerTransactions[0].signer.address.address === address.address) {  // 署名アドレスとウォレットのアドレスが同じ場合　
                             if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                                 dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`; 
                             }else{                                       //　ネームスペースがない場合
                                  dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaic.id.id.toHex()}</strong></font>`;
                             }    
                             dom_amount.innerHTML = `<font color="#FF0000" size="+1">💁‍♀️➡️💰 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                          }else{     //  署名アドレスとウォレットアドレスが違う場合
                             if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                                                       
                                 dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                             }else{                                      // ネームスペースがない場合
                                  dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaic.id.id.toHex()}</strong></font>`;
                             }
                             dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                          }

                        dom_aggTx.innerHTML = `<font color="#FF00FF">aggTx(${aggTx[0].innerTransactions.length})　${getTransactionType(aggTx[0].innerTransactions[0].type)}</font>`;                      
                        dom_tx.appendChild(dom_aggTx);                     // dom_aggTx をdom_txに追加        
                        dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                        dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加                                                                                           
                    }                   
                    
                    if (aggTx[0].innerTransactions[0].message !== undefined){     // １つ目、2つ目のインナートランザクションにメッセージがあれば表示する。 
                        dom_message.innerHTML = `</br><font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[0].message.payload}</font>`;     // 　メッセージ              
                    }else
                       if (aggTx[0].innerTransactions[1].message !== undefined){
                           dom_message.innerHTML = `</br><font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[1].message.payload}</font>`;     // メッセージ
                       }  
                }

                if (aggTx[0].innerTransactions[0].type === 17229){       // 'MOSAIC_SUPPLY_REVOCATION' の場合
                  const dom_aggTx = document.createElement('div');	  
                  const dom_mosaic = document.createElement('div');
                  const dom_amount = document.createElement('div');
          
                 (async() => {
                    let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaic.id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
           
                    mosaicInfo = await mosaicRepo.getMosaic(aggTx[0].innerTransactions[0].mosaic.id.id).toPromise();// 可分性の情報を取得する                     
                    let div = mosaicInfo.divisibility; // 可分性      
                     
                             if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                                  dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                             }else{ 　　　　　　　　　　　　　　　　　　　　　  // ネームスペースがない場合
                                   dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaic.id.id.toHex()}</strong></font>`;
                             }
                             dom_amount.innerHTML = `<font color="#3399FF" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量                
                 })(); // async() 
               
                  dom_aggTx.innerHTML = `<font color="#FF00FF">aggTx(${aggTx[0].innerTransactions.length})　${getTransactionType(aggTx[0].innerTransactions[0].type)}</font>`;  // アグリの数　と　Type
                  dom_tx.appendChild(dom_aggTx);
                  dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                  dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加                                                                  	  		  		  	  
                }

                    dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加
                    dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く  
              })(); // async() 
          }	    	    
            //dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
            dom_txInfo.appendChild(dom_tx);                    // トランザクション情報を追加

            console.log('%c= = = = = = = = = = = = = = = =','color: green');
            console.log(`%ctx[${t}][${ymdhms}] =`,"color: blue",tx);      //　トランザクションをコンソールに表示　//////////////////
	    t = ++t;
    }    // tx の数だけループ処理 
  })	// txRepo.search(searchCriteria).subscribe(async txs => 
}, 1000)



// Transaction Type を返す関数  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getTransactionType (type) { // https://symbol.github.io/symbol-sdk-typescript-javascript/1.0.3/enums/TransactionType.html
  switch(type){
    case 16720:
      return 'ACCOUNT_ADDRESS_RESTRICTION';
      break;
    case 16716:
      return 'ACCOUNT_KEY_LINK';
      break;  
    case 16708:
      return 'ACCOUNT_METADATA';
      break;
    case 16976:
      return 'ACCOUNT_MOSAIC_RESTRICTION';
      break;
    case 17232:
      return 'ACCOUNT_OPERATION_RESTRICTION';
      break;
    case 16974:
      return 'ADDRESS_ALIAS';
      break;
    case 16961:
      return 'AGGREGATE_BONDED';
      break;
    case 16705:
      return 'AGGREGATE_COMPLETE';
      break;
    case 16712:
      return 'HASH_LOCK';
      break;
    case 16977:
      return 'MOSAIC_ADDRESS_RESTRICTION';
      break;
    case 17230:
      return 'MOSAIC_ALIAS';
      break;
    case 16717:
      return 'MOSAIC_DEFINITION';
      break;
    case 16721:
      return 'MOSAIC_GLOBAL_RESTRICTION';
      break;
    case 16964:
      return 'MOSAIC_METADATA';
      break;
    case 16973:
      return 'MOSAIC_SUPPLY_CHANGE';
      break;
    case 17229:
      return 'MOSAIC_SUPPLY_REVOCATION';
      break;
    case 16725:
      return 'MULTISIG_ACCOUNT_MODIFICATION';
      break;
    case 17220:
      return 'NAMESPACE_METADATA';
      break;
    case 16718:
      return 'NAMESPACE_REGISTRATION';
      break;
    case 16972:
      return 'NODE_KEY_LINK';
      break;
    case 0:
      return 'RESERVED';
      break;
    case 16722:
      return 'SECRET_LOCK';
      break;
    case 16978:
      return 'SECRET_PROOF';
      break;
    case 16724:
      return 'TRANSFER';
      break;
    case 16707:
      return 'VOTING_KEY_LINK';
      break;
    case 16963:
      return 'VRF_KEY_LINK';
      break;  
    default:
      return 'Other';
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// handleSSS関数はトランザクションを作成し、window.SSS.setTransaction関数を実行しSSSにトランザクションを登録します。
// そしてwindow.SSS.requestSign関数を実行し、SSSを用いた署名をユーザ－に要求します。

async function handleSSS() {   
 // if (address1.length === 0){ // アグリゲートTxの配列が空の場合    < transfer>   
    console.log('handle sss');
    let addr = document.getElementById('form-addr').value;
    const mosaic_ID = document.getElementById('form-mosaic_ID').value;
    const amount = document.getElementById('form-amount').value;
    const message = document.getElementById('form-message').value;
    const enc = document.getElementById('form-enc').value;
    const maxfee = document.getElementById('form-maxfee').value;
       
        if (addr.length === 45){   //ハイフン有りのアドレスの場合
           addr = addr.replace(/-/g,"");  // ハイフンを削除する
        }
        addr = addr.replace(/ /g,"");  // スペース削除
        addr = addr.replace(/　/g,""); //　スペース削除
      
        console.log("mosaic_ID==",mosaic_ID);
        console.log("amount==",amount);
        console.log("message==",message);
        console.log("maxfee==",maxfee);
     
        console.log("%cmessage UTF-8 バイト数=","color: red",bytelength(message));

               if (bytelength(message) > 1024){   
                   swal(`メッセージのサイズが${bytelength(message)}バイトです!!          
                   1024バイト 以下にしてください。`);
                  return;             
               }

     mosaicInfo = await mosaicRepo.getMosaic(new sym.MosaicId(mosaic_ID)).toPromise();// 可分性の情報を取得する 
     const div = mosaicInfo.divisibility; // 可分性

  
     if (enc === "0"){                      //////////////// メッセージが平文の場合 ////////////////////////////////////

       if (addr.length === 39){  //文字数が39文字の場合
         if (networkType === 152){
           if (addr.charAt(0) !== "T"){
              swal('Address Error !!');
              return;
           }
         }
         if (networkType === 104){
           if (addr.charAt(0) !== "N"){
             swal('Address Error !!');
             return;
           }
         } 

        const account_check = await accountRepo.getAccountInfo(sym.Address.createFromRawAddress(addr))
                        .toPromise()
                        .catch(() => swal('Address Error !!'));          // アドレス　有無のチェック
             console.log("%caccount_check","color: red",account_check)           

        if (account_check === true){ // アドレスがない場合は処理を終了
           console.log("%cAddress Error!!","color: red");
           return;
        }              

        const tx = sym.TransferTransaction.create(        // トランザクションを生成
        sym.Deadline.create(epochAdjustment),
        sym.Address.createFromRawAddress(addr),
        [
          new sym.Mosaic(
            new sym.MosaicId(mosaic_ID),
            sym.UInt64.fromUint(Number(amount)*10**div) // div 可分性を適用
          )
        ],
        sym.PlainMessage.create(message),
        networkType,
        sym.UInt64.fromUint(1000000*Number(maxfee))          // MaxFee 設定
       )
        window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
        window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
        console.log('signedTx', signedTx);
        txRepo.announce(signedTx);
        })
       }else{ // 文字数が39以外の場合　(ネームスペース)
        const namespaceId = new sym.NamespaceId(addr.toLowerCase());      
        const ns_check = await nsRepo.getLinkedAddress(namespaceId)
                        .toPromise()
                        .catch(() => swal('NameSpace Error !!'));          // ネームスペース　有無のチェック

        if (ns_check === true){ // ネームスペースがない場合は処理を終了
           console.log("%cNameSpace Error!!","color: red");
           return;
        }              

        const tx = sym.TransferTransaction.create(        // トランザクションを生成
          sym.Deadline.create(epochAdjustment),
          namespaceId,
          [
            new sym.Mosaic(
              new sym.MosaicId(mosaic_ID),
              sym.UInt64.fromUint(Number(amount)*10**div) // div 可分性を適用
            )
          ],
          sym.PlainMessage.create(message),
          networkType,
          sym.UInt64.fromUint(1000000*Number(maxfee))          // MaxFee 設定
         )        
          window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
          window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
          console.log('signedTx', signedTx);
          txRepo.announce(signedTx);
          })
        } 
     }else
        if (enc === "1"){                ////////////// メッセージが暗号の場合 /////////////////////////////////////////////////
          if (addr.length === 39){  //文字数が39文字の場合
            if (networkType === 152){
              if (addr.charAt(0) !== "T"){
                 swal('Address Error !!');
                 return;
              }
            }
            if (networkType === 104){
              if (addr.charAt(0) !== "N"){
                swal('Address Error !!');
                return;
              }
            } 
   
           const account_check = await accountRepo.getAccountInfo(sym.Address.createFromRawAddress(addr))
                           .toPromise()
                           .catch(() => swal('Address Error !!'));          // アドレス　有無のチェック
                console.log("%caccount_check","color: red",account_check)           
   
           if (account_check === true){ // アドレスがない場合は処理を終了
              console.log("%cAddress Error!!","color: red");
              return;
           } 

             const alice = sym.Address.createFromRawAddress(addr);   //アドレスクラスの生成
             accountInfo = await accountRepo.getAccountInfo(alice).toPromise();  //　送信先アドレスの公開鍵を取得する
             console.log("accontInfo=",accountInfo);
             
             const pubkey = accountInfo.publicKey;
             window.SSS.setMessage(message, pubkey);
             window.SSS.requestSignEncription().then((msg) => {
                 setTimeout(() => {
                   console.log({ msg });
                   const tx = sym.TransferTransaction.create(        // トランザクションを生成
                   sym.Deadline.create(epochAdjustment),
                   sym.Address.createFromRawAddress(addr),
                   [
                     new sym.Mosaic(
                       new sym.MosaicId(mosaic_ID),
                       sym.UInt64.fromUint(Number(amount)*10**div) // div 可分性を適用
                     )
                   ],
                   msg,
                   networkType,
                   sym.UInt64.fromUint(1000000*Number(maxfee))          // MaxFee 設定  
                   )
                   window.SSS.setTransaction(tx);               // SSSにトランザクションを登録
                   window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求                   
                   console.log('signedTx', signedTx);
                   txRepo.announce(signedTx);    
                   })
                 }, 1000)      
             });  
            }else{ // 文字数が39以外の場合 (ネームスペース)
              const namespaceId = new sym.NamespaceId(addr.toLowerCase());      
              const ns_check = await nsRepo.getLinkedAddress(namespaceId)
                              .toPromise()
                              .catch(() => swal('NameSpace Error !!'));          // ネームスペース　有無のチェック
      
              if (ns_check === true){ // ネームスペースがない場合は処理を終了
                 console.log("%cNameSpace Error!!","color: red");
                 return;
              }   
             //const namespaceId = new sym.NamespaceId(addr);
             const address = await nsRepo.getLinkedAddress(namespaceId).toPromise();
             const alice = sym.Address.createFromRawAddress(address.address);   //アドレスクラスの生成
             accountInfo = await accountRepo.getAccountInfo(alice).toPromise();  //　送信先アドレスの公開鍵を取得する
             console.log("accontInfo=",accountInfo);
             
             const pubkey = accountInfo.publicKey;
             window.SSS.setMessage(message, pubkey);
             window.SSS.requestSignEncription().then((msg) => {
                 setTimeout(() => {
                   console.log({ msg });
                   const tx = sym.TransferTransaction.create(        // トランザクションを生成
                   sym.Deadline.create(epochAdjustment),
                   namespaceId,
                   [
                     new sym.Mosaic(
                       new sym.MosaicId(mosaic_ID),
                       sym.UInt64.fromUint(Number(amount)*10**div) // div 可分性を適用
                     )
                   ],
                   msg,
                   networkType,
                   sym.UInt64.fromUint(1000000*Number(maxfee))          // MaxFee 設定  
                   )
                   window.SSS.setTransaction(tx);               // SSSにトランザクションを登録
                   window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求                   
                   console.log('signedTx', signedTx);
                   txRepo.announce(signedTx);    
                   })
                 }, 1000)      
             });               
            }
      }
    }   
   
   async function handleSSS_agg() {            //////////    aggregate Tx  一括送信 /////////////////////////////////////////////
                  
                console.log('handle sss_agg');
                let mosaic_ID2 = document.querySelector('.select_m1').value;
                let amount2 = document.getElementById('form-amount2').value;
                const message2 = document.getElementById('form-message2').value;
                //const enc2 = document.getElementById('form-enc2').value;
                //const maxfee2 = document.getElementById('form-maxFee2').value;

                console.log("mosaic_ID==",mosaic_ID2);
                console.log("amount==",amount2);
                console.log("message==",message2);
               // console.log("maxfee==",maxfee2);

               console.log("%cmessage UTF-8 バイト数=","color: red",bytelength(message2));

               if (bytelength(message2) > 1024){   
                   swal(`メッセージのサイズが${bytelength(message2)}バイトです!!          
                   1024バイト 以下にしてください。`);
                  return;             
               }

              /*  const res1 = await resMosaicRepo
                .search({ mosaicId: new sym.MosaicId(mosaic_ID2),
                  pageSize: 100})
                .toPromise();
                 console.log("%c制限状態チェック","color: red",res1); */

                mosaicInfo = await mosaicRepo.getMosaic(new sym.MosaicId(mosaic_ID2)).toPromise();// 可分性の情報を取得する 
                let div = mosaicInfo.divisibility; // 可分性

                  let innerTx = [];
                  for (let i=0; i<address1.length; i++){                           
                            if (amount1[i] !== undefined){    // 3列目 amount がある場合
                                amount2 = amount1[i];
                                
                            }
                            if (mosaic1[i] !== undefined){    // 4列目 mosaic がある場合
                                mosaic_ID2 = mosaic1[i];
                                mosaicInfo = await mosaicRepo.getMosaic(new sym.MosaicId(mosaic_ID2)).toPromise();// 可分性の情報を取得する 
                                div = mosaicInfo.divisibility; // 可分性
                            }

                            if (address1[i].length === 39){  // アドレスの場合
			                        innerTx[i] = sym.TransferTransaction.create(
                              undefined, //Deadline
                              sym.Address.createFromRawAddress(address1[i]), //送信先
                              [
                                  new sym.Mosaic(
                                      new sym.MosaicId(mosaic_ID2),
                                      sym.UInt64.fromUint(Number(amount2)*10**div) // div 可分性を適用  
                                      )
                              ],
                              sym.PlainMessage.create(message2),
                              networkType
                              );
                            }else{  // ネームスペースの場合
                                namespaceId = new sym.NamespaceId(address1[i]); 
                                innerTx[i] = sym.TransferTransaction.create(
                                undefined, //Deadline
                                namespaceId, //送信先
                                [
                                    new sym.Mosaic(
                                        new sym.MosaicId(mosaic_ID2),
                                        sym.UInt64.fromUint(Number(amount2)*10**div) // div 可分性を適用  
                                        )
                                ],
                                sym.PlainMessage.create(message2),
                                networkType
                                );
                            }

                  }

                  const publicAccount = sym.PublicAccount.createFromPublicKey(
                    window.SSS.activePublicKey,
                    networkType
                  );

                  for (let i=0; i<address1.length; i++){
                      innerTx[i] = innerTx[i].toAggregate(publicAccount)
                  }

                  const aggregateTx = sym.AggregateTransaction.createComplete(
                    sym.Deadline.create(epochAdjustment),  //Deadline
                    innerTx,
                    networkType,
                    [],
                    /*sym.UInt64.fromUint(1000000*Number(maxfee2))          //最大手数料*/
                  ).setMaxFeeForAggregate(100);

                  console.log("aggregateTx====",aggregateTx)
                  console.log("aggregateTx.maxFee======",parseInt(aggregateTx.maxFee.toHex(),16)/1000000);

                  const agg_fee = document.getElementById("agg_fee1");    // aggregate 手数料表示
                  agg_fee.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(aggregateTx.maxFee.toHex(),16)/1000000} XYM　　　　</p>`

                 window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
                 window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
                 console.log('signedTx', signedTx);
                 txRepo.announce(signedTx);
                 })  
   }
	 
   function handleSSS_dona(){   //  開発者への寄付
       
    let addr = "NBOGLHXSI7FDRAO2CMZV5PQZ5UHZ3IED67ULPSY";
    const mosaic_ID = "6BED913FA20223F8";
    const amount = document.getElementById('dona_amount').value;
    const message = document.getElementById('dona_message').value;
    //const enc = document.getElementById('form-enc').value;
    const maxfee = document.getElementById('dona_maxFee').value;
    const div = 6;

       const tx = sym.TransferTransaction.create(        // トランザクションを生成
         sym.Deadline.create(epochAdjustment),
         sym.Address.createFromRawAddress(addr),
         [
           new sym.Mosaic(
             new sym.MosaicId(mosaic_ID),
             sym.UInt64.fromUint(Number(amount)*10**div) // div 可分性を適用
           )
         ],
         sym.PlainMessage.create(message),
         networkType,
         sym.UInt64.fromUint(1000000*Number(maxfee))          // MaxFee 設定
         )
         window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
         window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
         console.log('signedTx', signedTx);
         txRepo.announce(signedTx);
         })
   }

/////////////////////////////////////////////////////////////////////////////////////////////
// 未承認状態の時にpopup する
// ポップアップのセッティング処理
function popupSetting(){
  let popup = document.getElementById('popup');
  if(!popup) return;

  let bgBlack = document.getElementById('bg-black');
  let showBtn = document.getElementById('show-btn');

  // ポップアップ
  popUp(bgBlack);
  popUp(showBtn);

  // ポップアップ処理
  function popUp(elem){
    if(!elem) return;
    elem.addEventListener('click', function(){
      popup.classList.toggle('is-show');
    });
  }
}

// ポップアップのセッティング
popupSetting();


/////////////////////// セレクトボックスの Page No を変更した時にトランザクション履歴を再読み込みする //////////////////////////////////////////////////////////////////
  

function select_Page() {

 const address = sym.Address.createFromRawAddress(window.SSS.activeAddress);
  
  const check_netType = address.address.charAt(0);     // 1文字目を抽出

   if (check_netType === 'N'){           //ネットワークの判別　 メインネット 
       epochAdjustment = EPOCH_M;
       NODE = NODE_URL_M;
       networkType = NET_TYPE_M;
       generationHash = GENERATION_HASH_M;
       XYM_ID = XYM_ID_M;
     
       repo = repo_M;
       accountRepo = accountRepo_M;
       txRepo = txRepo_M;
       mosaicRepo = mosaicRepo_M;
       nsRepo = nsRepo_M;
       
      console.log("MAIN_NET");
   }else 
      if (check_netType === 'T'){      // テストネット
          epochAdjustment = EPOCH_T;
          NODE = NODE_URL_T;
          networkType = NET_TYPE_T;
	        generationHash = GENERATION_HASH_T;
          XYM_ID = XYM_ID_T;
        
          repo = repo_T;
          accountRepo = accountRepo_T;
          txRepo = txRepo_T;
          mosaicRepo = mosaicRepo_T;
          nsRepo = nsRepo_T;
        
          console.log("TEST_NET");
      }
       console.log("check_netType=",check_netType);
 
  
  
const page_num = document.getElementById('page_num1').value;  /////////  セレクトボックスから、Page No を取得  ///////////////////////
  
const searchCriteria = {                                   
  group: sym.TransactionGroup.Confirmed,
  address,
  pageNumber: page_num,
  pageSize: 50,
  order: sym.Order.Desc,
  embedded: false,
};
         
console.log("searchCriteria=",searchCriteria);  //////////////////
console.log("txRepo=",txRepo);   //////////////////

const dom_txInfo = document.getElementById('wallet-transactions'); 
    console.log("dom_txInfo=",dom_txInfo); ////////////////
    if (dom_txInfo !== null){ // null じゃなければ子ノードを全て削除  
      while(dom_txInfo.firstChild){
          dom_txInfo.removeChild(dom_txInfo.firstChild);
      }
    }

//////////////////////////////////////////////////////////////////


txRepo
  .search(searchCriteria)
  .subscribe(async txs => {
    console.log("txs=",txs);         /////////////////
        
    let t=1;
    let en = new Array(searchCriteria.pageSize);
    
    for (let tx of txs.data) {   ///////////////    tx を pageSize の回数繰り返す ///////////////////
         
         const dom_tx = document.createElement('div');
         const dom_date = document.createElement('div');
         const dom_txType = document.createElement('div');
         const dom_hash = document.createElement('div');
         const dom_signer_address = document.createElement('div');
         const dom_recipient_address = document.createElement('div');
      
         const dom_enc = document.createElement('div');
         const dom_message = document.createElement('div');
         const dom_namespace = document.createElement('div');
         //const dom_mosaic = document.createElement('div');
         const dom_account = document.createElement('div');
         const dom_restriction = document.createElement('div');
         const dom_NFT = document.createElement('div');
	    
         dom_txType.innerHTML = `<p style="text-align: right; line-height:100%;&"><font color="#0000ff">< ${getTransactionType(tx.type)} ></font></p>`;        //　 　Tx Type
                 
         // dom_hash.innerHTML = `<p style="text-align: right"><button type="button" class="button-txinfo"><a href="${EXPLORER}/transactions/${tx.transactionInfo.hash}" target="_blank" rel="noopener noreferrer"><i>⛓ Transaction Info ⛓</i></a></button></p>`; //Tx hash
         dom_hash.innerHTML = `<p style="text-align: right"><button type="button" class="button-txinfo" id="${EXPLORER}/transactions/${tx.transactionInfo.hash}" onclick="transaction_info(this.id);"><i>⛓ Transaction Info ⛓</i></a></button></p>`; //Tx hash 
        
         dom_signer_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">From : ${tx.signer.address.address}</font><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${tx.signer.address.address}" onclick="Onclick_Copy(this.id);" /></div>`;    //  送信者 アドレス
               
          
           ////////////////////////////////////////////　　  　timestamp to Date 　　　　　/////////////////////////
           const timestamp = epochAdjustment + (parseInt(tx.transactionInfo.timestamp.toHex(), 16)/1000);   /////////////// Unit64 を 16進数に　変換したあと10進数に変換　
           const date = new Date(timestamp * 1000);
      
           const yyyy = `${date.getFullYear()}`;
           // .slice(-2)で文字列中の末尾の2文字を取得する
           // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
           const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
           const dd = `0${date.getDate()}`.slice(-2);
           const HH = `0${date.getHours()}`.slice(-2);
           const mm = `0${date.getMinutes()}`.slice(-2);
           const ss = `0${date.getSeconds()}`.slice(-2);

           const ymdhms = `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
      
           //console.log(ymdhms);  // 日時を表示
      
           dom_date.innerHTML = `<font color="#7E00FF"><p style="text-align: right">${ymdhms}</p></font>`;    //　日付  右寄せ
           ///////////////////////////////////////////////////////////////////////////////////////////////////////
         
           dom_tx.appendChild(dom_hash);                      // dom_hash(⛓Transacrion info⛓) をdom_txに追加
           dom_tx.appendChild(dom_date);                      // dom_date(日付)　をdom_txに追加           	        
           dom_tx.appendChild(dom_txType);                    // dom_txType(Txタイプ) をdom_txに追加         
           dom_tx.appendChild(dom_signer_address);            // dom_signer_address(送信者アドレス) をdom_txに追加  
	    
          //  ----------------------------------------------------------------  //

          if (tx.type === 16724){ // tx.type が 'TRANSFER' の場合    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
	            if (tx.recipientAddress.address === undefined){  // 宛先が Namespace の場合 NamespaceId から取得し表示する
                    (async() => {    
	                      //let namespacesNames = await nsRepo.getNamespacesNames([sym.NamespaceId.createFromEncoded(tx.recipientAddress.id.toHex())]).toPromise();
                          const namespaceName = await nsRepo.getNamespace(tx.recipientAddress.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック
                        if (namespaceName !== undefined){  
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          }
		                      dom_recipient_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">To　: <a href="${EXPLORER}/namespaces/${name1}" target="_blank" rel="noopener noreferrer">${name1}</a><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${name1}" onclick="Onclick_Copy(this.id);" /></div></font>`; //  文字列の結合　   宛先                       
                        }else{
                          dom_namespace.innerHTML =`<font color="#ff6347"><big>To:　Namespace 期限切れ</big></font>`;                          
                        }
                    })(); // async() 
	            }else{   // Nから始まるの39文字のアドレスの場合はそのままアドレスを表示
                   dom_recipient_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">To　:   ${tx.recipientAddress.address}</font><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${tx.recipientAddress.address}" onclick="Onclick_Copy(this.id);" /></div>`; //  文字列の結合　   宛先
	            }	
	            dom_tx.appendChild(dom_recipient_address);         // dom_recipient_address をdom_txに追加
            
              //console.log('Tx_Mosaics =',tx.mosaics.length);  ///  モザイクの数を表示 ///////////////////////////////////////////
                  
              /////////// モザイクが空ではない場合   /////////////////　　モザイクが空の場合はこの for 文はスルーされる  //////////
              for(let i=0; i<tx.mosaics.length; i++){  //モザイクの数だけ繰り返す
                  const dom_mosaic = document.createElement('div');  
                  const dom_amount = document.createElement('div');
                  const dom_mosaic_img = document.createElement('div');                  
          
               (async() => {
                  let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(tx.mosaics[i].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
		       
                  mosaicInfo = await mosaicRepo.getMosaic(tx.mosaics[i].id.id).toPromise();// 可分性の情報を取得する                     
                  let div = mosaicInfo.divisibility; // 可分性      
                  
                       if(tx.signer.address.address === address.address) {  // 署名アドレスとウォレットのアドレスが同じ場合　 
                      
                          if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                              dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`; 
                          }else{   　　　　　　　　　　　　　　　　　　　　　 //　ネームスペースがない場合
                              dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<strong>${tx.mosaics[i].id.id.toHex()}</strong></font>`;
                          }    
                          dom_amount.innerHTML = `<font color="#FF0000" size="+1">💁‍♀️➡️💰 :　<i><big><strong> ${(parseInt(tx.mosaics[i].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量

                       }else{     //  署名アドレスとウォレットアドレスが違う場合
                           if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                           }else{ 　　　　　　　　　　　　　　　　　　　　　  // ネームスペースがない場合
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${tx.mosaics[i].id.id.toHex()}</strong></font>`;   
                                // console.log("%cdom_mosaic====","color: red",tx.mosaics[i].id.id.toHex(),i);                            
                           }                           
                           dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(tx.mosaics[i].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                       }
		            // console.log("%ci モザイクが空では無い場合の処理　iだよ　",'color: red',i);                
                 
                })(); // async() 
               
                nftdrive(tx.mosaics[i].id,dom_NFT); // nftdrive NFT画像表示
                comsa(tx.mosaics[i].id,dom_NFT);    // comsa NFT画像表示

                let xhr = new XMLHttpRequest();     // mosaic-center の画像を表示
                xhr.open("GET",`https://mosaic-center.tk/db/api.php?mode=search&mosaicid=${tx.mosaics[i].id.toHex()}`,false);  

                let data;
                xhr.send(null);
                if (xhr.status == 200) {
                    data = xhr.response;
                    data = JSON.parse(data);
                  if (data !== null){
                    let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(tx.mosaics[i].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
                    if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                      dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${[mosaicNames][0][0].names[0].name}</a><br><br>`
                    }else{                                       // ネームスペースがない場合
                      dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${data[0][2]}</a><br><br>`
                    }
                  }
                }else{
                     console.log(`Error: ${xhr.status}`);
                }

                dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加
                dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加
                dom_tx.appendChild(dom_NFT);                       // dom_NFT をdom_txに追加
                dom_tx.appendChild(dom_mosaic_img);                // dom_mosaic_img をdom_txに追加 
                                
              }  //モザイクの数だけ繰り返す
             //})(); // async() 
	
             if (tx.mosaics.length === 0){   // モザイクが空の場合  //////////////　モザイクがある場合はこの if 文はスルーされる
                  const dom_mosaic = document.createElement('div');
                  const dom_amount = document.createElement('div');
                  
                   if(tx.signer.address.address === address.address) {  // 署名アドレスとウォレットのアドレスが同じ場合
                       dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　No mosaic</font>`;     // No mosaic
                       dom_amount.innerHTML = `<font color="#FF0000">💁‍♀️➡️💰 : </font>`;     // 　数量
                   }else{          //  署名アドレスとウォレットアドレスが違う場合
                         dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　No mosaic</font>`;     // No mosaic
                         dom_amount.innerHTML = `<font color="#008000">💰➡️😊 : </font>`;     // 　数量        
                   } 
                   dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
		               dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加
             }     /////////////////////////////////////////////////////////////////////////////////////////////////////    
                     
             if (tx.message.type === 1){   // メッセージが暗号文の時          
	               let alice;
		             let PubKey;
                 let enc_message1 = {};
                 dom_enc.innerHTML = `<font color="#ff00ff"><strong></br><ul class="decryption">暗号化メッセージ</strong>　< Encrypted Message ></font>`;     // 暗号化メッセージの場合
		     
                 dom_tx.appendChild(dom_enc);

               (async() => { 

                if (tx.recipientAddress.address !== undefined){ //送信先のアドレスが、39文字のアドレスの場合

                   if (tx.recipientAddress.address !== tx.signer.address.address){    // 送信先アドレスと、送信元アドレスが異なる場合  ///////////////////////////////
                     if (tx.signer.address.address === address.address){   // 署名アドレスと、ウォレットアドレスが同じ場合
                     alice = sym.Address.createFromRawAddress(tx.recipientAddress.address);   //アドレスクラスの生成
      
                     }else
                        if (tx.recipientAddress.address === address.address){ // 送信先アドレスと、ウォレットアドレスが同じ場合
                             alice = sym.Address.createFromRawAddress(tx.signer.address.address);   //アドレスクラスの生成			
                        } 
            
                   }else{    // 送信先アドレスと、ウォレットアドレスが同じ場合
                              alice = sym.Address.createFromRawAddress(tx.recipientAddress.address);   //アドレスクラスの生成
                              PubKey = window.SSS.activePublicKey;
                   }

                }else{  //送信先のアドレスが、ネームスペースの場合
                   const to_address = await nsRepo.getLinkedAddress(tx.recipientAddress.id).toPromise();

		               if (to_address.address !== tx.signer.address.address){    // 送信先アドレスと、送信元アドレスが異なる場合  ///////////////////////////////
			               if (tx.signer.address.address === address.address){   // 署名アドレスと、ウォレットアドレスが同じ場合
			               alice = sym.Address.createFromRawAddress(tx.recipientAddress.address);   //アドレスクラスの生成
				
			               }else
                        if (to_address.address === address.address){ // 送信先アドレスと、ウォレットアドレスが同じ場合
			                       alice = sym.Address.createFromRawAddress(tx.signer.address.address);   //アドレスクラスの生成			
			                  } 
			 			 
		               }else{    // 送信先アドレスと、ウォレットアドレスが同じ場合
			                        alice = sym.Address.createFromRawAddress(to_address.address);   //アドレスクラスの生成
		                          PubKey = window.SSS.activePublicKey;
		               }                                                                       
                }   
		                       accountRepo.getAccountInfo(alice).toPromise().then((accountInfo) => { //  アドレスから公開鍵を取得する
			                     PubKey = accountInfo.publicKey;  
		                       enc_message1.message = tx.message.payload;
		                       enc_message1.PubKey = PubKey;	     	      		       
		                       en[t] = enc_message1; 
		                       // console.table(en);
		       		       
	                         dom_message.innerHTML = `<input type="button" id="${PubKey}" value="${tx.message.payload}" onclick="Onclick_Decryption(this.id, this.value);" class="button-decrypted"/></div>`;     // 　メッセージ
                           dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加                                                              
                           dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く    
               
	                     }); //公開鍵を取得
               })(); // async() 
	           }else{          // 平文の場合
                 dom_message.innerHTML = `<font color="#4169e1"></br>< Message ></br>${tx.message.payload}</font>`;     // 　メッセージ
                 dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加                                                              
                 dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
             }	   
          } // tx.type が 'TRANSFER' の場合

          //  ----------------------------------------------------------------  //

	        if (tx.type === 16718){       // tx.type が 'NAMESPACE_REGISTRATION' の場合	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	           if (tx.registrationType === 0){
              dom_namespace.innerHTML = `<font color="#008b8b">root Namespace 登録 :　<big><strong>${tx.namespaceName}</strong></big></font>`; 
             }else
                if (tx.registrationType === 1){
              dom_namespace.innerHTML = `<font color="#008b8b">sub Namespace 登録 :　<big><strong>${tx.namespaceName}</strong></big></font>`; 
             }
	            dom_tx.appendChild(dom_namespace);                 // namespaceをdom_txに追加
              dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加                                                              
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く          	  		  		  	  
	        }
          //  ----------------------------------------------------------------  //

          if (tx.type === 17229){       // tx.type が 'MOSAIC_SUPPLY_REVOCATION' の場合	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const dom_mosaic = document.createElement('div');
            const dom_amount = document.createElement('div');
    
           (async() => {
              let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(tx.mosaic.id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
     
              mosaicInfo = await mosaicRepo.getMosaic(tx.mosaic.id.id).toPromise();// 可分性の情報を取得する                     
              let div = mosaicInfo.divisibility; // 可分性      
               
                       if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                            dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                       }else{ 　　　　　　　　　　　　　　　　　　　　　  // ネームスペースがない場合
                             dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<strong>${tx.mosaic.id.id.toHex()}</strong></font>`;
                       }
                       dom_amount.innerHTML = `<font color="#3399FF" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(tx.mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量                
           })(); // async() 
         
            dom_recipient_address.innerHTML = `<div class="copy_container"><font color="#2f4f4f">回収先 :　${tx.sourceAddress.address}</font><input type="image" src="src/copy.png" class="copy_bt" height="20px" id="${tx.sourceAddress.address}" onclick="Onclick_Copy(this.id);" /></div>`;
            dom_tx.appendChild(dom_recipient_address);
            dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
            dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加                                                           
            dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く          	  		  		  	  
        }
          //  ----------------------------------------------------------------  // 

          if (tx.type === 16973){       // tx.type が 'MOSAIC_SUPPLY_CHANGE' の場合	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
             const dom_mosaic = document.createElement('div');
             if (tx.action === 0){
                 dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　${tx.mosaicId.toHex()}　<br><big><strong> 減少　⬇️　${parseInt(tx.delta.toHex(),16)}</strong></big></font>`;
             }else
                if (tx.action === 1){
                   dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　${tx.mosaicId.toHex()}　<br><big><strong> 増加　⬆️　${parseInt(tx.delta.toHex(),16)}</strong></big></font>`;
                }
                dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }

          //  ----------------------------------------------------------------  //

          if (tx.type === 16974){       // tx.type が 'ADDRESS_ALIAS' の場合   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
           (async() => {
              let alias_Action; 
              if (tx.aliasAction === 1){
                alias_Action = "Link";
               }else
                  if(tx.aliasAction === 0){
                alias_Action = "Unlink";
               } 
             // let namespacesNames = await nsRepo.getNamespacesNames([sym.NamespaceId.createFromEncoded(tx.namespaceId.id.toHex())]).toPromise();
                          const namespaceName = await nsRepo.getNamespace(tx.namespaceId.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック;
                        if (namespaceName !== undefined){  
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          } 	  
                          dom_namespace.innerHTML = `<font color="#008b8b">Namespace エイリアス <strong>${alias_Action}</strong></br></br>Namespace : <strong>${name1} </strong></br>Address : </br><strong>${tx.address.address}</strong></font>`; 
                        }else{
                          dom_namespace.innerHTML =`<font color="#ff6347"><big>Namespace 期限切れ</big></font>`;
                        }  
              dom_tx.appendChild(dom_namespace);                 // dom_namespaceをdom_txに追加                                                             
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
            })(); // async()           	  		  		  	  
          }
          //  ----------------------------------------------------------------  //

          if (tx.type === 17230){       // tx.type が 'MOSAIC_ALIAS' の場合	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            (async() => {
              let alias_Action; 
              if (tx.aliasAction === 1){
                alias_Action = "Link";
               }else
                  if(tx.aliasAction === 0){
                alias_Action = "Unlink";
               }
             // let namespacesNames = await nsRepo.getNamespacesNames([sym.NamespaceId.createFromEncoded(tx.namespaceId.id.toHex())]).toPromise();
                        const namespaceName = await nsRepo.getNamespace(tx.namespaceId.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック;
                        if (namespaceName !== undefined){  
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          }
                          dom_namespace.innerHTML = `<font color="#008b8b">Mosaic エイリアス <strong>${alias_Action}</strong></br></br>Namespace : <strong>${name1} </strong></br>MosaicID : <strong>${tx.mosaicId.id.toHex()}</strong></font>`;
                        }else{
                          dom_namespace.innerHTML =`<font color="#ff6347"><big>Namespace 期限切れ</big></font>`;
                        }

              dom_tx.appendChild(dom_namespace);                  // dom_namespaceをdom_txに追加                                                               
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く   
            })(); // async()          	  		  		  	  
          }
	        //  ----------------------------------------------------------------  //

          if (tx.type === 16720){       // tx.type が 'ACCOUNT_ADDRESS_RESTRICTION' の場合	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////              
              if (tx.restrictionFlags === 1){
                   restriction_type = "指定アドレスからのみ受信許可";
                   res_Flag = "　　　　　　　　　➡️🟢";
              }
              if (tx.restrictionFlags === 16385){
                   restriction_type = "指定アドレス宛のみ送信許可";
                   res_Flag = "　　　　　　　　　🟢➡️";
              }
              if (tx.restrictionFlags === 32769){
                   restriction_type = "指定アドレスからの受信拒否";
                   res_Flag = "　　　　　　　　　➡️❌";
              }
              if (tx.restrictionFlags === 49153){
                   restriction_type = "指定アドレス宛への送信禁止";
                   res_Flag = "　　　　　　　　　❌➡️";
              }   

              if (tx.restrictionAdditions.length !== 0){   // 制限追加
                dom_restriction.innerHTML = `<font color="#ff4500"><strong>⚠️アカウントアドレス制限　追加</strong></font>
                <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                <br>${res_Flag}
                <br>アドレス : <strong>${tx.restrictionAdditions[0].address}</strong></font>`
              }

              if (tx.restrictionDeletions.length !== 0){   // 制限削除
                 dom_restriction.innerHTML = `<font color="#3399FF"><strong>⚠️アカウントアドレス制限　削除</strong></font>
                 <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                 <br>${res_Flag}
                 <br>アドレス : <strong>${tx.restrictionDeletions[0].address}</strong></font>`
              }

              dom_tx.appendChild(dom_restriction);               // dom_restrictionをdom_txに追加
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }
          //  ----------------------------------------------------------------  //

          if (tx.type === 16976){       // tx.type が 'ACCOUNT_MOSAIC_RESTRICTION' の場合	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              if (tx.restrictionFlags === 2){
                  restriction_type = "指定モザイクを含むトランザクションのみ受信許可";
                  res_Flag = "　　　　　　　　　➡️🟢";
              }
              if (tx.restrictionFlags === 32770){
                restriction_type = "指定モザイクを含むトランザクションを受信拒否";
                res_Flag = "　　　　　　　　　➡️❌";
              }

              if (tx.restrictionAdditions.length !== 0){   // 制限追加
                 dom_restriction.innerHTML = `<font color="#ff4500"><strong>⚠️アカウントモザイク制限　追加</strong></font>
                 <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                 <br>${res_Flag}
                 <br>モザイクID : <strong>${tx.restrictionAdditions[0].id.toHex()}</strong></font>`
              }

              if (tx.restrictionDeletions.length !== 0){   // 制限削除
                dom_restriction.innerHTML = `<font color="#3399FF"><strong>⚠️アカウントモザイク制限　削除</strong></font>
                <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
                <br>${res_Flag}
                <br>モザイクID : <strong>${tx.restrictionDeletions[0].id.toHex()}</strong></font>`
             }

              dom_tx.appendChild(dom_restriction);               // dom_restrictionをdom_txに追加
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }
          //  ----------------------------------------------------------------  //

          if (tx.type === 17232){       // tx.type が 'ACCOUNT_OPERATION_RESTRICTION' の場合	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              if (tx.restrictionFlags === 16388){
                  restriction_type = "指定トランザクションの送信のみ許可";
                  res_Flag = "　　　　　　　　　🟢➡️";
              }
              if (tx.restrictionFlags === 49156){
                  restriction_type = "指定トランザクションの送信を禁止";
                  res_Flag = "　　　　　　　　　❌➡️";
              }

              dom_restriction.innerHTML = `<font color="#ff4500"><strong>⚠️アカウントトランザクション制限</strong></font>
              <font color="#008b8b"><br><br>タイプ : <strong>${restriction_type}</strong>
              <br>${res_Flag}
              <br>Tx タイプ : <strong>${getTransactionType(tx.restrictionAdditions[0])}</strong></font>`
             
              dom_tx.appendChild(dom_restriction);               // dom_restrictionをdom_txに追加
              dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
          }
          //  ----------------------------------------------------------------  //

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        if (tx.type === 16961 || tx.type === 16705){      // tx.type が 'AGGREGATE_BONDED'　または 'AGGREGATE_COMPLETE' の場合		///////////////////////////////////////////////////////////////////////////////////////////////
           (async() => {      		      
                     const aggTx = await txRepo.getTransactionsById([tx.transactionInfo.hash],sym.TransactionGroup.Confirmed).toPromise();
                     console.log('%c///////////////////////////////','color: green');
		                 console.log(`%caggTx  ( ${ymdhms} )`,"color: blue",aggTx[0]);
                                                         	                                                                              
                 const dom_amount = document.createElement('div');
          
    		        if (aggTx[0].innerTransactions[0].type === 16724){  // TRANSFER の場合
                     
                     const dom_aggTx = document.createElement('div');
                     const dom_mosaic = document.createElement('div'); 
                     const dom_NFT = document.createElement('div');
                     const dom_mosaic_img = document.createElement('div');

                     let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
     
                     mosaicInfo = await mosaicRepo.getMosaic(aggTx[0].innerTransactions[0].mosaics[0].id.id).toPromise();// 可分性の情報を取得する                     
                     let div = mosaicInfo.divisibility; // 可分性
                             
                          if (aggTx[0].innerTransactions[0].signer.address.address === address.address){  // 署名アドレスとウォレットのアドレスが同じ場合　
                      
                             if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                                 dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`; 
                             }else{                                       //　ネームスペースがない場合
                                  dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex()}</strong></font>`;
                             }    
                             dom_amount.innerHTML = `<font color="#FF0000" size="+1">💁‍♀️➡️💰 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaics[0].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量

                          }else{     //  署名アドレスとウォレットアドレスが違う場合
                             if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                                 dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                             }else{                                      // ネームスペースがない場合
                                   dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex()}</strong></font>`;                                  
                             }
                             dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaics[0].amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
		                      }

                          if (aggTx[0].innerTransactions[0].message !== undefined){     // １つ目、2つ目のインナートランザクションにメッセージがあれば表示する。
                              dom_message.innerHTML = `<font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[0].message.payload}</font>`;     // 　メッセージ
                              if (aggTx[0].innerTransactions[0].message.payload === `{"version":"comsa-nft-1.0"}` || aggTx[0].innerTransactions[0].message.payload === `{"version":"comsa-nft-1.1"}`){
                               // dom_NFT.innerHTML = `<font color="#4169e1">< Mosaic ID ></br>${aggTx[0].innerTransactions[1].mosaics[0].id.id.toHex()}`;
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[1].mosaics[0].id.id.toHex()}</strong></font>`;
                                dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[1].mosaics[0].amount.toHex(), 16)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量 
                                comsa(aggTx[0].innerTransactions[1].mosaics[0].id,dom_NFT); // comsa NFT画像表示
                              }
                              if (aggTx[0].innerTransactions[0].message.payload === `{"version":"comsa-ncft-1.1"}`){
                                dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[1].mosaics[0].id.id.toHex()}</strong></font>`;
                                dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[1].mosaics[0].amount.toHex(), 16)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                                comsaNCFT(aggTx[0].innerTransactions[1].mosaics[0].id,dom_NFT); // comsa NCFT画像表示
                              }
                          }else
                             if (aggTx[0].innerTransactions[1].message !== undefined){
                                 dom_message.innerHTML = `<font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[1].message.payload}</font>`;     // メッセージ
                             }
                        
                        dom_aggTx.innerHTML = `<font color="#FF00FF">aggTx(${aggTx[0].innerTransactions.length})　${getTransactionType(aggTx[0].innerTransactions[0].type)}</font>`;  // アグリの数　と　Type

                        nftdrive(aggTx[0].innerTransactions[0].mosaics[0].id,dom_NFT); // nftdrive NFT画像表示 


                        let xhr = new XMLHttpRequest();     // mosaic-center の画像を表示
                        xhr.open("GET",`https://mosaic-center.tk/db/api.php?mode=search&mosaicid=${aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex()}`,false);  

                        let data;
                        xhr.send(null);
                        if (xhr.status == 200) {
                           data = xhr.response;
                           data = JSON.parse(data);
                           if (data !== null){
                            let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaics[0].id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
                            if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                              dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${[mosaicNames][0][0].names[0].name}</a><br><br>`
                            }else{                                       // ネームスペースがない場合
                              dom_mosaic_img.innerHTML =`<br><a class="btn-style-link" href="https://mosaic-center.tk/" target="_blank">Mosaic Center</a><br><br><img class="mosaic_img" src=${data[0][7]} width="200"><br><a style="color: #1e90ff">${data[0][2]}</a><br><br>`
                            }
                           }
                        }else{
                              console.log(`Error: ${xhr.status}`);
                        }
 
                        dom_tx.appendChild(dom_aggTx);                     // dom_aggTx をdom_txに追加
                        dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                        dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加
                        dom_tx.appendChild(dom_NFT);                    // dom_NFT をdom_txに追加
                        dom_tx.appendChild(dom_mosaic_img);                // dom_mosaic_img をdom_txに追加
	              }   

                if (aggTx[0].innerTransactions[0].type === 16717){ // MOSAIC_REGISTRATION の場合
                    const dom_mosaic = document.createElement('div');
                    dom_mosaic.innerHTML = `<font color="#008b8b">Mosaic 登録 :　<big><strong>${aggTx[0].innerTransactions[0].mosaicId.id.toHex()}</strong></big></font>`; 
                    dom_tx.appendChild(dom_mosaic);                  // dom_mosaicをdom_txに追加
                }

                if (aggTx[0].innerTransactions[0].type === 16708){ // ACCOUNT_METADATAの場合
                    dom_account.innerHTML = `<font color="#ff6347"><big>METADATA登録 :　　Account</font><br><strong><font color="#008b8b"> Key :　${aggTx[0].innerTransactions[0].scopedMetadataKey.toHex()}<br>Address : ${window.SSS.activeAddress}</strong></big></font>`; 
                    dom_tx.appendChild(dom_account);
                }

                if (aggTx[0].innerTransactions[0].type === 16964){ // MOSAIC_METADATA の場合
                    const dom_mosaic = document.createElement('div');
                    dom_mosaic.innerHTML = `<font color="#ff6347"><big>METADATA登録 :　　Mosaic </font><br><strong><font color="#008b8b"> Key :　${aggTx[0].innerTransactions[0].scopedMetadataKey.toHex()}<br>Mosaic ID: 　${aggTx[0].innerTransactions[0].targetMosaicId.toHex()}</strong></big></font>`;
                    dom_tx.appendChild(dom_mosaic);                  // dom_mosaicをdom_txに追加      
                } 

                if (aggTx[0].innerTransactions[0].type === 17220){ // NAMESPACE_METADATA
                    //var ns_name_Meta = await nsRepo.getNamespacesNames([aggTx[0].innerTransactions[0].targetNamespaceId.id]).toPromise();
                          const namespaceName = await nsRepo.getNamespace(aggTx[0].innerTransactions[0].targetNamespaceId.id).toPromise().catch(() => console.count(`Namespace Error!!`));         // Namespace　有無のチェック
                        //  console.log("1257==",namespaceName);
                        if (namespaceName !== undefined){
                          const a = await nsRepo.getNamespacesNames([namespaceName.levels[0].id]).toPromise();
                          let name1 = [a][0][0].name;   //  root
                          if (namespaceName.levels.length > 1){
                              const b = await nsRepo.getNamespacesNames([namespaceName.levels[1].id]).toPromise();
                              name1 = name1 + "." + [b][0][0].name;  // sub1
                              if (namespaceName.levels.length > 2){
                                  const c = await nsRepo.getNamespacesNames([namespaceName.levels[2].id]).toPromise();
                              name1 = name1 + "." + [c][0][0].name;  // sub2
                              }
                          }
                          dom_namespace.innerHTML = `<font color="#ff6347"><big>METADATA登録 :　　Namespace</font><br><strong><font color="#008b8b"> Key :　${aggTx[0].innerTransactions[0].scopedMetadataKey.toHex()}<br>Namespace :　${name1}</strong></big></font>`; 
                        }else{
                              dom_namespace.innerHTML =`<font color="#ff6347"><big>Namespace 期限切れ</big></font>`;
                        }
                    dom_tx.appendChild(dom_namespace);                  // dom_namespaceをdom_txに追加
                }

                if (aggTx[0].innerTransactions[0].type === 16722){ // SECRET_LOCK
                    const dom_aggTx = document.createElement('div');                                                                                                     
                    if (aggTx[0].innerTransactions[0].mosaic !== undefined){   
                         const dom_mosaic = document.createElement('div');                  
                         let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaic.id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
     
                          mosaicInfo = await mosaicRepo.getMosaic(aggTx[0].innerTransactions[0].mosaic.id.id).toPromise();// 可分性の情報を取得する                     
                          let div = mosaicInfo.divisibility; // 可分性
                  
                          if(aggTx[0].innerTransactions[0].signer.address.address === address.address) {  // 署名アドレスとウォレットのアドレスが同じ場合　
                             if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合
                                 dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`; 
                             }else{                                       //　ネームスペースがない場合
                                  dom_mosaic.innerHTML = `<font color="#FF0000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaic.id.id.toHex()}</strong></font>`;
                             }    
                             dom_amount.innerHTML = `<font color="#FF0000" size="+1">💁‍♀️➡️💰 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                          }else{     //  署名アドレスとウォレットアドレスが違う場合
                             if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                                                       
                                 dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                             }else{                                      // ネームスペースがない場合
                                  dom_mosaic.innerHTML = `<font color="#008000">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaic.id.id.toHex()}</strong></font>`;
                             }
                             dom_amount.innerHTML = `<font color="#008000" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量
                          }

                        dom_aggTx.innerHTML = `<font color="#FF00FF">aggTx(${aggTx[0].innerTransactions.length})　${getTransactionType(aggTx[0].innerTransactions[0].type)}</font>`;                      
                        dom_tx.appendChild(dom_aggTx);                     // dom_aggTx をdom_txに追加        
                        dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                        dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加                                                                                           
                    }                   
                    
                    if (aggTx[0].innerTransactions[0].message !== undefined){     // １つ目、2つ目のインナートランザクションにメッセージがあれば表示する。 
                        dom_message.innerHTML = `</br><font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[0].message.payload}</font>`;     // 　メッセージ              
                    }else
                       if (aggTx[0].innerTransactions[1].message !== undefined){
                           dom_message.innerHTML = `</br><font color="#4169e1">< Message ></br>${aggTx[0].innerTransactions[1].message.payload}</font>`;     // メッセージ
                       }  
                }

                if (aggTx[0].innerTransactions[0].type === 17229){       // 'MOSAIC_SUPPLY_REVOCATION' の場合
                  const dom_aggTx = document.createElement('div');	  
                  const dom_mosaic = document.createElement('div');
                  const dom_amount = document.createElement('div');
          
                 (async() => {
                    let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(aggTx[0].innerTransactions[0].mosaic.id.id.toHex())]).toPromise(); // Namespaceの情報を取得する
           
                    mosaicInfo = await mosaicRepo.getMosaic(aggTx[0].innerTransactions[0].mosaic.id.id).toPromise();// 可分性の情報を取得する                     
                    let div = mosaicInfo.divisibility; // 可分性      
                     
                             if ([mosaicNames][0][0].names.length !==0){ // ネームスペースがある場合                         
                                  dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<big><strong>${[mosaicNames][0][0].names[0].name}</strong></big></font>`;
                             }else{ 　　　　　　　　　　　　　　　　　　　　　  // ネームスペースがない場合
                                   dom_mosaic.innerHTML = `<font color="#3399FF">Mosaic :　<strong>${aggTx[0].innerTransactions[0].mosaic.id.id.toHex()}</strong></font>`;
                             }
                             dom_amount.innerHTML = `<font color="#3399FF" size="+1">💰➡️😊 :　<i><big><strong> ${(parseInt(aggTx[0].innerTransactions[0].mosaic.amount.toHex(), 16)/(10**div)).toLocaleString(undefined, { maximumFractionDigits: 6 })} </big></strong><i></font>`;    // 　数量                
                 })(); // async() 
               
                  dom_aggTx.innerHTML = `<font color="#FF00FF">aggTx(${aggTx[0].innerTransactions.length})　${getTransactionType(aggTx[0].innerTransactions[0].type)}</font>`;  // アグリの数　と　Type
                  dom_tx.appendChild(dom_aggTx);
                  dom_tx.appendChild(dom_mosaic);                    // dom_mosaic をdom_txに追加 
                  dom_tx.appendChild(dom_amount);                    // dom_amount をdom_txに追加                                                                  	  		  		  	  
                }

                    dom_tx.appendChild(dom_message);                   // dom_message をdom_txに追加
                    dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く  
              })(); // async() 
          }	    	    
            //dom_tx.appendChild(document.createElement('hr'));  // 水平線を引く
            dom_txInfo.appendChild(dom_tx);                    // トランザクション情報を追加

            console.log('%c= = = = = = = = = = = = = = = =','color: green');
            console.log(`%ctx[${t}][${ymdhms}] =`,"color: blue",tx);      //　トランザクションをコンソールに表示　//////////////////
	    t = ++t;
    }    // tx の数だけループ処理 
  })	// txRepo.search(searchCriteria).subscribe(async txs =>  

}

///////////////////////////////////////////  　　　　発行した  Mosaic ページ切り替え       /////////////////////////////////

function select_Page_mosa1(){

  const page_num_mosa1 = document.getElementById('page_num_mosa1').value;  /////////  セレクトボックスから、Page No を取得  ///////////////////////

  const dom_ms = document.getElementById('ms_table'); 
  if (dom_ms !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_ms.firstChild){
        dom_ms.removeChild(dom_ms.firstChild);
    }
  }

  const dom_re = document.querySelector('.revoke_select'); 
  if (dom_re !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_re.firstChild){
        dom_re.removeChild(dom_re.firstChild);
    }
  }

  const dom_mo = document.querySelector('.select_mosaicID'); 
  if (dom_mo !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_mo.firstChild){
        dom_mo.removeChild(dom_mo.firstChild);
    }
  }

  const dom_sup = document.querySelector('.select_mosaic_sup'); 
  if (dom_sup !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_sup.firstChild){
        dom_sup.removeChild(dom_sup.firstChild);
    }
  }


  accountRepo.getAccountInfo(sym.Address.createFromRawAddress(window.SSS.activeAddress))
  .toPromise()
  .then((accountInfo) => {
        console.log("accountInfo=",accountInfo)     
        console.log("account_Mosaics =",accountInfo.mosaics.length);

  //ブロック
  chainRepo.getChainInfo().subscribe(chain=>{  //////////   

    rxjs.zip(
      blockRepo1.getBlockByHeight(chain.height),
      blockRepo1.getBlockByHeight(chain.latestFinalizedBlock.height),
    ).subscribe(zip => {

      $("#chain_height").html(    //  最新ブロック
        "[ <a target='_blank' href='" + EXPLORER + "/blocks/" + zip[0].height.compact() + "'>" + zip[0].height.compact() + "</a> ]　日時: " + dispTimeStamp(Number(zip[0].timestamp.toString()),epochAdjustment)
      );
      $("#finalized_chain_height").html(   //  確定ブロック
        "[ <a target='_blank' href='" + EXPLORER + "/blocks/" + zip[1].height.compact() + "'>" + zip[1].height.compact() + "</a> ]　日時: " + dispTimeStamp(Number(zip[1].timestamp.toString()),epochAdjustment)
      );
      console.log("ブロック高=",zip[0].height.compact());
      console.log("ファイナライズブロック=",zip[1].height.compact());

  
  mosaicRepo.search({ownerAddress: sym.Address.createFromRawAddress(window.SSS.activeAddress),
    pageNumber: page_num_mosa1,
    pageSize: 50,
    order: sym.Order.Desc
   })
.subscribe(async mosaic=>{

console.log("mosaic_data=",mosaic.data);

console.log("モザイクの数",mosaic.data.length);

const select_revoke = []; //　セレクトボックス初期化 (モザイク回収)
const select_mosaicID = []; //　セレクトボックス初期化 (モザイクID)
const select_mosaic_sup =[]; //　セレクトボックス初期化 (モザイクID 供給量変更)
var body = document.getElementById("ms_table");

// <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
var tbl = document.createElement("table");
var tblBody = document.createElement("tbody");
let mosaicNames;
// すべてのセルを作成
for (var i = -1; i < mosaic.data.length; i++) {  // ネームスペースの数だけ繰り返す
if (i > -1){
mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(mosaic.data[i].id.id.toHex())]).toPromise(); // モザイクIDからNamespaceの情報を取得する
}
// 表の行を作成
var row = document.createElement("tr");

for (var j = 0; j < 11; j++) {
// <td> 要素とテキストノードを作成し、テキストノードを
// <td> の内容として、その <td> を表の行の末尾に追加
var cell = document.createElement("td");                                                   
switch(j){
case 0:   //モザイクID
 if (i === -1){
     var cellText = document.createTextNode("モザイクID");
     select_mosaicID.push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
     select_mosaic_sup.push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
 break;
 }                             
    var cellText = document.createTextNode(mosaic.data[i].id.id.toHex());
    if (mosaic.data[i].duration.compact() === 0){ // ステータスが無効なモザイクを排除                               
       select_mosaicID.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
       if (mosaic.data[i].flags.supplyMutable === true){ // 供給量可変　🟢
         select_mosaic_sup.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
       }
   }else
      if (endHeight - zip[0].height.compact() > 0){ // ステータスが無効なモザイクを排除
         select_mosaicID.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
         if (mosaic.data[i].flags.supplyMutable === true){ // 供給量可変　🟢
           select_mosaic_sup.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
         }
      }
 break;                
case 1:   //ネームスペース名
 if (i === -1){
     var cellText = document.createTextNode("ネームスペース名");
 break;
 } 
 if ([mosaicNames][0][0].names.length !==0){  // ネームスペースがある場合                       
     var cellText = document.createTextNode([mosaicNames][0][0].names[0].name);
 }else{   // ネームスペースが無い場合
       var cellText = document.createTextNode("N/A"); 
 }
 break;       
case 2:   // 供給量
 if (i === -1){
     var cellText = document.createTextNode("供給量");
 break;
 }
var supply1 = mosaic.data[i].supply.compact()/(10 ** mosaic.data[i].divisibility);
    supply1 = supply1.toLocaleString();

 var cellText = document.createTextNode(supply1); 
 break; 
case 3:   //残高
 if (i === -1){
     var cellText = document.createTextNode("残高");
     break;
 }                             
 for (var k = 0; k < accountInfo.mosaics.length; k++){ 
   if (accountInfo.mosaics[k].id.id.toHex() === mosaic.data[i].id.id.toHex()){ // accountInfoのamount データを探す
      var balance = accountInfo.mosaics[k].amount.compact();
   }
 }
 balance = balance/(10 ** mosaic.data[i].divisibility);   // 可分性を考慮
 balance = balance.toLocaleString();

 var cellText = document.createTextNode(balance);
 break;
case 4:   //有効期限
 if (i === -1){
     var cellText = document.createTextNode("有効期限");
     break;
 }
 if (mosaic.data[i].duration.compact() === 0){
     var cellText = document.createTextNode("---　無期限　---");
 }else{
      var endHeight = mosaic.data[i].startHeight.compact() + mosaic.data[i].duration.compact()   
      var remainHeight = endHeight - zip[0].height.compact();    
           t = dispTimeStamp(zip[0].timestamp.compact() + (remainHeight * 30000),epochAdjustment)                  
      var cellText = document.createTextNode(t);
 }
 break;
case 5:   // ステータス
 if (i === -1){
     var cellText = document.createTextNode("ステータス");
     break;
 }
 if (mosaic.data[i].duration.compact() === 0){
     var cellText = document.createTextNode("　　🟢");
 }else
    if (mosaic.data[i].duration.compact() > 0){
        var endHeight = mosaic.data[i].startHeight.compact() + mosaic.data[i].duration.compact()
        if (endHeight - zip[0].height.compact() > 0){
          var cellText = document.createTextNode("　　🟢");
        }else{
         var cellText = document.createTextNode("　　❌");
        }
    }
 break;
case 6:   // 可分性
 if (i === -1){
     var cellText = document.createTextNode("可分性");
     break;
 }
     var cellText = document.createTextNode(`　${mosaic.data[i].divisibility}`);
 break;
case 7:   //　制限可
 if (i === -1){
     var cellText = document.createTextNode("制限可");
     break;
 }
 if (mosaic.data[i].flags.restrictable === true){
     var cellText = document.createTextNode("　🟢");
 }else
    if (mosaic.data[i].flags.restrictable === false){
        var cellText = document.createTextNode("　❌");
    }                           
 break;                                  
case 8:  // 供給量可変
 if (i === -1){
     var cellText = document.createTextNode("供給量可変");
     break;
 }
 if (mosaic.data[i].flags.supplyMutable === true){
     var cellText = document.createTextNode("　　🟢");
 }else
    if (mosaic.data[i].flags.supplyMutable === false){
        var cellText = document.createTextNode("　　❌");
    }                              
 break;      
case 9:   // 転送可
 if (i === -1){
     var cellText = document.createTextNode("転送可");                                  
     break;
 }
 if (mosaic.data[i].flags.transferable === true){
     var cellText = document.createTextNode("　🟢");
 }else
    if (mosaic.data[i].flags.transferable === false){
        var cellText = document.createTextNode("　❌");
    }                                                    
 break;      
case 10:   // 回収可
 if (i === -1){
     var cellText = document.createTextNode("回収可");
     select_revoke.push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
     break;
 }
 if (mosaic.data[i].flags.revokable === true){
     var cellText = document.createTextNode("　🟢");
     if(mosaic.data[i].duration.compact() === 0){ // ステータスが無効なモザイクを排除
       select_revoke.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
     }else
        if (endHeight - zip[0].height.compact() > 0){ // ステータスが無効なモザイクを排除
           select_revoke.push({value:mosaic.data[i].id.id.toHex(),name:mosaic.data[i].id.id.toHex()}); //セレクトボックス用の連想配列を作る
        }
 }else
    if (mosaic.data[i].flags.revokable === false){
        var cellText = document.createTextNode("　❌");
    }                           
 break;      
case 11:   // 編集
 /////////////////////////////  保留  //////////
 if (i === -1){
     var cellText = document.createTextNode("");
     break;
 }
 if (mosaic.data[i].duration.compact() === 0){
     var cellText = document.createTextNode("");
 }else
    if (mosaic.data[i].duration.compact() > 0){
        var endHeight = mosaic.data[i].startHeight.compact() + mosaic.data[i].duration.compact()
        if (endHeight - zip[0].height.compact() > 0){
            var cellText = document.createTextNode("");
        }else{
             var cellText = document.createTextNode("");
        }
 }
 break;    
}      
cell.appendChild(cellText);
row.appendChild(cell);
}

// 表の本体の末尾に行を追加
tblBody.appendChild(row);
}

// <tbody> を <table> の中に追加
tbl.appendChild(tblBody);
// <table> を <body> の中に追加
body.appendChild(tbl);
// tbl の border 属性を 2 に設定
tbl.setAttribute("border", "1"); 
console.log("%cselect_revoke=","color: red",select_revoke);
console.log("%cselect_mosaicID=","color: red",select_mosaicID);
  console.log("%cselect_mosaic_sup=","color: red",select_mosaic_sup);

  ////    セレクトボックス  (回収モザイク用)    ///////////////////////////////////////

  const jsSelectBox_rev = document.querySelector('.revoke_select');
  const select = document.createElement('select');

  select.classList.add('select_r');
  select_revoke.forEach((v) => {
  const option = document.createElement('option');
  option.value = v.value;
  option.textContent = v.name;
  select.appendChild(option);
  });
  jsSelectBox_rev.appendChild(select);

  ////    select_mosaicID  (Metadata用)    ///////////////////////////////////////

  const jsSelectBox_mosaicID = document.querySelector('.select_mosaicID');
  const select_mo = document.createElement('select');

  select_mo.classList.add('select_mo');
  select_mosaicID.forEach((v) => {
  const option = document.createElement('option');
  option.value = v.value;
  option.textContent = v.name;
  select_mo.appendChild(option);
  });
  jsSelectBox_mosaicID.appendChild(select_mo);

  /////   mosaic_ID セレクトボックス  (供給量変更用）///////////////////////////////

  const jsSelectBox_sup = document.querySelector('.select_mosaic_sup');
  const select_sup = document.createElement('select');

  select_sup.classList.add('select_sup');
  select_mosaic_sup.forEach((v) => {
  const option = document.createElement('option');
  option.value = v.value;
  option.textContent = v.name;
  select_sup.appendChild(option);
  });
  jsSelectBox_sup.appendChild(select_sup);                

  });

    })});
  
  });
}

///////////////////////////////////////////  　　　　発行した  Namespace ページ切り替え       /////////////////////////////////

function select_Page_namespace(){

  const page_num_namespace = document.getElementById('page_num_namespace').value;  /////////  セレクトボックスから、Page No を取得  ///////////////////////
  
  const dom_ns = document.getElementById('ns_table'); 
  if (dom_ns !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_ns.firstChild){
        dom_ns.removeChild(dom_ns.firstChild);
    }
  }

  const dom_nse = document.querySelector('.Namespace_select'); 
  if (dom_nse !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_nse.firstChild){
        dom_nse.removeChild(dom_nse.firstChild);
    }
  }


  accountRepo.getAccountInfo(sym.Address.createFromRawAddress(window.SSS.activeAddress))
  .toPromise()
  .then((accountInfo) => {
        console.log("accountInfo=",accountInfo)     
        console.log("account_Mosaics =",accountInfo.mosaics.length);

     ////

         //ブロック
          chainRepo.getChainInfo().subscribe(chain=>{  //////////   

            rxjs.zip(
              blockRepo1.getBlockByHeight(chain.height),
              blockRepo1.getBlockByHeight(chain.latestFinalizedBlock.height),
            ).subscribe(zip => {

              $("#chain_height").html(    //  最新ブロック
                "[ <a target='_blank' href='" + EXPLORER + "/blocks/" + zip[0].height.compact() + "'>" + zip[0].height.compact() + "</a> ]　日時: " + dispTimeStamp(Number(zip[0].timestamp.toString()),epochAdjustment)
              );
              $("#finalized_chain_height").html(   //  確定ブロック
                "[ <a target='_blank' href='" + EXPLORER + "/blocks/" + zip[1].height.compact() + "'>" + zip[1].height.compact() + "</a> ]　日時: " + dispTimeStamp(Number(zip[1].timestamp.toString()),epochAdjustment)
              );
              console.log("%c現在のブロック高=","color: red",zip[0].height.compact());
              console.log("%cファイナライズブロック=","color: red",zip[1].height.compact());

                          

              //// ネームスペース テーブル　//////////////////////////////////////////////////////////////////////////////
 
              nsRepo.search({ownerAddress:accountInfo.address,
                             pageNumber: page_num_namespace,
                             pageSize: 50,
                             order: sym.Order.Desc
                            }) /////    保有ネームスペース
              .subscribe(async ns=>{

                console.log("{ownerAddress:accountInfo.address}: ",{ownerAddress:accountInfo.address});

                var Nnames1 = new Array(ns.data.length);
                var i=0;
                var ddNamespace = new Array(ns.data.length);
                for(const nsInfo of ns.data){  

                //  console.log("%cnsInfo==","color: blue",nsInfo)
                  if(nsInfo.levels.length == 1){ //ルートネームスペース

                    const Nnames = await nsRepo.getNamespacesNames([nsInfo.levels[nsInfo.levels.length - 1]]).toPromise();
                          Nnames1[i] = Nnames[0].name;       

                    var namespace = "";
                    for(const namespaceName of Nnames){
                      if(namespace != ""){
                        namespace = "." + namespace;
                      }
                      namespace = namespaceName.name + namespace;
                    }

                    var remainHeight = nsInfo.endHeight.compact() - zip[0].height.compact();
                      //  console.log("期限が終了するブロック: " + nsInfo.endHeight.compact());  
                      //  console.log("あと残りのブロック: " + remainHeight);

                    t = dispTimeStamp(zip[0].timestamp.compact() + (remainHeight * 30000),epochAdjustment)
                 // t = dispTimeStamp(nsInfo.endHeight.compact() * 30000,epochAdjustment);
                 // ddNamespace += '<dd>' + namespace + ' [期限: ' + t + ']</dd>';
                    ddNamespace[i] = t;
                  } 
      
                  if(nsInfo.levels.length == 2){ //サブネームスペース                
                    const Nnames = await nsRepo.getNamespacesNames([nsInfo.levels[nsInfo.levels.length - 1]]).toPromise();
                    Nnames1[i] = Nnames[1].name + "." + Nnames[0].name;
                    //console.log("%cNnames[i]================","color: red",Nnames[i])
                    //ddNamespace[i] = t; 
                  }

                  if(nsInfo.levels.length == 3){ //サブネームスペース                
                    const Nnames = await nsRepo.getNamespacesNames([nsInfo.levels[nsInfo.levels.length - 1]]).toPromise();
                    Nnames1[i] = Nnames[2].name + "." + Nnames[1].name + "." + Nnames[0].name;
                   //ddNamespace[i] = t; 
                  }

                  i=++i;
                }
                
                console.log("ns_data=",ns.data);

                console.log("ネームスペースの数",ns.data.length);
                   const select_ns = [];   // セレクトボックス初期化　（エイリアスリンク/ネームスペース）

                   var body = document.getElementById("ns_table");

                   // <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
                   var tbl = document.createElement("table");
                   var tblBody = document.createElement("tbody");
                 
                   // すべてのセルを作成
                   for (var i = -1; i < ns.data.length; i++) {  // ネームスペースの数だけ繰り返す
                     // 表の行を作成
                     var row = document.createElement("tr");

                     for (var j = 0; j < 6; j++) {
                       // <td> 要素とテキストノードを作成し、テキストノードを
                       // <td> の内容として、その <td> を表の行の末尾に追加
                       var cell = document.createElement("td");                                                   
                          switch(j){
                            case 0:   //ネームスペースID
                              if (i === -1){
                                  var cellText = document.createTextNode("ネームスペース名");
                                  select_ns .push({value:"--- Select ---",name:"--- Select ---"}); //セレクトボックス用の連想配列を作る
                                  break;
                              }                        
                              var cellText = document.createTextNode(Nnames1[i]);
                                 if (zip[0].height.compact() < ns.data[i].endHeight.compact() - grace_block){  // ステータスが無効なネームスペースを排除
                                    select_ns .push({value:Nnames1[i],name:Nnames1[i]}); //セレクトボックス用の連想配列を作る                              
                                 }    
                                  break;
                            case 1:   //ネームスペース名
                              if (i === -1){
                                  var cellText = document.createTextNode("ネームスペースID");
                                  break;
                              }                            
                              if (ns.data[i].levels.length === 1){ //　ルートネームスペースの時
                                  var cellText = document.createTextNode(ns.data[i].levels[0].id.toHex());
                              }else
                                 if (ns.data[i].levels.length === 2){ //  サブネームスペース1の時
                                     var cellText = document.createTextNode(ns.data[i].levels[1].id.toHex());
                                 }else
                                    if (ns.data[i].levels.length === 3){ //  サブネームスペース2の時
                                       var cellText = document.createTextNode(ns.data[i].levels[2].id.toHex());
                                    }
                                 break;  
                            case 2:   // 有効期限
                              if (i === -1){
                                  var cellText = document.createTextNode("更新期限");
                                  break;
                              }
                              if (ns.data[i].levels.length !== 1){
                                  var cellText = document.createTextNode("----------------");
                              }else{
                                  var cellText = document.createTextNode(ddNamespace[i]);
                              }
                              break; 
                            case 3: 
                              if (i === -1){
                                  var cellText = document.createTextNode("ステータス");
                                  break;
                              }                         
                              if (zip[0].height.compact() > ns.data[i].endHeight.compact() - grace_block){
                                  var cellText = document.createTextNode("　　❌");
                              }else
                                 if (zip[0].height.compact() < ns.data[i].endHeight.compact() - grace_block){
                                     var cellText = document.createTextNode("　　🟢");
                                 }
                              break;
                            case 4:   // エイリアスタイプ
                              if (i === -1){
                                  var cellText = document.createTextNode("タイプ");
                                  break;
                              }
                              if (ns.data[i].alias.type === 0){ 
                                  var cellText = document.createTextNode("--------");
                              }else
                                 if (ns.data[i].alias.type === 1){
                                  var cellText = document.createTextNode("Mosaic");
                                 }else
                                    if (ns.data[i].alias.type === 2){
                                        var cellText = document.createTextNode("Address");
                                    }
                              break;
                            case 5:   // エイリアス
                              if (i === -1){
                                  var cellText = document.createTextNode("🔗リンク🔗");
                                  break;
                              }
                              if (ns.data[i].alias.type === 0){ 
                                var cellText = document.createTextNode("--------------------------------------------------------");
                              }else
                                 if (ns.data[i].alias.type === 1){
                                     var cellText = document.createTextNode(ns.data[i].alias.mosaicId.id.toHex());
                                 }else
                                    if (ns.data[i].alias.type === 2){
                                        var cellText = document.createTextNode(ns.data[i].alias.address.address);
                                    }
                              break;    
                            }  
                       cell.appendChild(cellText);
                       row.appendChild(cell);
                     }                     
                     // 表の本体の末尾に行を追加
                     tblBody.appendChild(row);
                   }
                   // <tbody> を <table> の中に追加
                   tbl.appendChild(tblBody);
                   // <table> を <body> の中に追加
                   body.appendChild(tbl);
                   // tbl の border 属性を 2 に設定
                   tbl.setAttribute("border", "1");


                   console.log("%cselect_ns:","color: red",select_ns); // ネームスペース　セレクトボックス ///////

                   const jsSelectBox = document.querySelector('.Namespace_select');
                   let select = document.createElement('select');

                   select.classList.add('select1');
                   select_ns.forEach((v) => {
                     const option = document.createElement('option');
                     option.value = v.value;
                     option.textContent = v.name;
                     select.appendChild(option);
                   });
                   jsSelectBox.appendChild(select);


                   /////   Namespace セレクトボックス  (Metadata用）

                   const jsSelectBox_N = document.querySelector('.Namespace_select_N');
                   const select_N = document.createElement('select');

                   select_N.classList.add('select_N');
                   select_ns.forEach((v) => {
                     const option = document.createElement('option');
                     option.value = v.value;
                     option.textContent = v.name;
                     select_N.appendChild(option);
                   });
                   jsSelectBox_N.appendChild(select_N);
                
                                 
              });
            })
          });  
     
  })

}

 ///////////////////////////////////////////         Meta テーブル  ページ切り替え    //////////////////////////////////

 function select_Page_meta(){
              
  const page_num_meta = document.getElementById('page_num_meta').value;  /////////  セレクトボックスから、Page No を取得  ///////////////////////

  const dom_Meta = document.getElementById('Meta_table'); 
        console.log("dom_txInfo=",dom_Meta); ////////////////
  if (dom_Meta !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_Meta.firstChild){
        dom_Meta.removeChild(dom_Meta.firstChild);
    }
  }

  const dom_Meta_select = document.querySelector('.Meta_select'); 
        console.log("dom_txInfo=",dom_Meta_select); ////////////////
  if (dom_Meta_select !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_Meta_select.firstChild){
      dom_Meta_select.removeChild(dom_Meta_select.firstChild);
    }
  }

  metaRepo
  .search({
   targetAddress: sym.Address.createFromRawAddress(window.SSS.activeAddress),
   pageNumber: page_num_meta,
   pageSize: 50,
   order: sym.Order.Desc
 }).subscribe(async data=>{
   
   console.log("data = = = =  ",data);

   const select_Meta = [];   // セレクトボックス初期化　（Meta Key）

   var body = document.getElementById("Meta_table");

   // <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
   var tbl = document.createElement("table");
   var tblBody = document.createElement("tbody");
 
   // すべてのセルを作成
   for (var i = -1; i < data.data.length; i++) {  // ネームスペースの数だけ繰り返す
     // 表の行を作成
     var row = document.createElement("tr");

     for (var j = 0; j < 6; j++) {
       // <td> 要素とテキストノードを作成し、テキストノードを
       // <td> の内容として、その <td> を表の行の末尾に追加
       var cell = document.createElement("td");                                                   
          switch(j){
            case 0:   //Metadata Key
              if (i === -1){
                  var cellText = document.createTextNode("メタデータ キー");
                  select_Meta.push({value:"",name:"新規 キー",type:"Type"}); //セレクトボックス用の連想配列を作る                       
                  break;
              }                        
              var cellText = document.createTextNode(data.data[i].metadataEntry.scopedMetadataKey.toHex()); // scopedMetadataKey を 16進数に変換
                if (i > -1){
                  select_Meta.push({value:data.data[i].metadataEntry.scopedMetadataKey.toHex(),name:data.data[i].metadataEntry.scopedMetadataKey.toHex(),type:data.data[i].metadataEntry.metadataType}); //セレクトボックス用の連想配列を作る                              
                }     
                  break;
            case 1:   //タイプ
              if (i === -1){
                 var cellText = document.createTextNode("タイプ");
                 break;
              }
              if (data.data[i].metadataEntry.metadataType === 0){
                 var cellText = document.createTextNode("Account");
              }else
                 if (data.data[i].metadataEntry.metadataType === 1){
                    var cellText = document.createTextNode("Mosaic");
                 }else
                    if (data.data[i].metadataEntry.metadataType === 2){
                       var cellText = document.createTextNode("Namespace"); 
                    }     
                break;  
            case 2:   // 対象ID
              if (i === -1){
                 var cellText = document.createTextNode("モザイク ID / ネームスペース");
                 break;
              }   
         //  console.log("対象ID＝＝＝",data.data[i].metadataEntry.targetId.id);
              if (data.data[i].metadataEntry.targetId === undefined){                                       
                 var cellText = document.createTextNode("N/A");      
              }else
                 if(data.data[i].metadataEntry.targetId !== undefined){
                   if (data.data[i].metadataEntry.metadataType === 1){  // モザイクの場合　ID
                       var cellText = document.createTextNode(data.data[i].metadataEntry.targetId.id.toHex());                                 
                   }else
                      if (data.data[i].metadataEntry.metadataType === 2){ // ネームスペースがある場合、ID → ネームスペースに変換                                             
                            var ns_name = await nsRepo.getNamespacesNames([data.data[i].metadataEntry.targetId.id]).toPromise(); 
                            if (ns_name.length === 1){
                                var cellText = document.createTextNode([ns_name][0][0].name);
                            }else
                               if (ns_name.length === 2){                                                    
                                   var cellText = document.createTextNode([ns_name][0][1].name + "." + [ns_name][0][0].name);
                               }else
                                  if (ns_name.length === 3){
                                      var cellText = document.createTextNode([ns_name][0][2].name + "." + [ns_name][0][1].name + "." + [ns_name][0][0].name);
                                  }
                      }
                }
                break;  
            case 3:   // value
              if (i === -1){
                  var cellText = document.createTextNode(" 　　Value(値)");
                 break;
              } 
                // if (isHexadecimal(data.data[i].metadataEntry.value) === true){  // 16進数文字列の場合　UTF-８に変換する
                //   value1 = sym.Convert.decodeHex(data.data[i].metadataEntry.value);
                //   var cellText = document.createTextNode(value1);
                //  }else{
                   var cellText = document.createTextNode(data.data[i].metadataEntry.value); 
                // }
                // console.log("%cメタデータエントリー中身","color: red",data.data[i]);                  
                 break;        
            case 4:  // 送信者アドレス
              if (i === -1){
                  var cellText = document.createTextNode("送信者アドレス");
                  break;
              }                         
                  var cellText = document.createTextNode(data.data[i].metadataEntry.sourceAddress.address);
                  break; 
            case 5:   // 対象アドレス
              if (i === -1){
                  var cellText = document.createTextNode("対象アドレス");
                  break;
              }
                  var cellText = document.createTextNode(data.data[i].metadataEntry.targetAddress.address);  
              break;    
               
            }  
       cell.appendChild(cellText);
       row.appendChild(cell);
     }                     
     // 表の本体の末尾に行を追加
     tblBody.appendChild(row);
   }
   // <tbody> を <table> の中に追加
   tbl.appendChild(tblBody);
   // <table> を <body> の中に追加
   body.appendChild(tbl);
   // tbl の border 属性を 2 に設定
   tbl.setAttribute("border", "1");


   console.log("%cselect_Meta:","color: red",select_Meta); // Metadata　セレクトボックス ///////

   const jsSelectBox = document.querySelector('.Meta_select');
   const select = document.createElement('select');

   select.classList.add('select_Meta');
   select_Meta.forEach((v) => {
     const option = document.createElement('option');
     option.value = v.value;
     option.textContent = v.name;
     select.appendChild(option);
   });
   jsSelectBox.appendChild(select);       
                     
 }); 

}    //  select_Page_meta

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              // 暗号化メッセージを復号する //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 
function Onclick_Decryption(PubKey,encryptedMessage){
    console.log("%cPubkeyだよ","color: blue",PubKey)
    console.log("%cencryptedMessageだよ","color: green",encryptedMessage)
	
    window.SSS.setEncryptedMessage(
            encryptedMessage,
            PubKey
    )
		
    window.SSS.requestSignDecription().then((data) => {
            console.log(data);
	    
	    swal(`暗号化メッセージ < Encrypted Message >

	    >>${encryptedMessage}
	    
	    復号化メッセージ < Decrypted Message >

	    >>${data}`); // ポップアップで表示
    })		
}

///////////////  Transaction Info ボタン ///////////////////////////

function transaction_info(url){ 
  window.open(url);  // hash からエクスプローラーを開く
}

///////////// /  タイムスタンプ  ////////////////////////////////////////////
function dispTimeStamp(timeStamp,epoch){

	const d = new Date(timeStamp + epoch * 1000)
	const strDate = d.getFullYear()%100
		+ "-" + paddingDate0( d.getMonth() + 1 )
		+ '-' + paddingDate0( d.getDate() )
		+ ' ' + paddingDate0( d.getHours() )
		+ ':' + paddingDate0( d.getMinutes() ) ;
	return 	strDate;
}

function getDateId(timeStamp,epoch){
	const d = new Date(timeStamp + epoch * 1000)
	const dateId = d.getFullYear()
		+ paddingDate0( d.getMonth() + 1 )
		+ paddingDate0( d.getDate() );
	return 	dateId;

}

function paddingDate0(num) {
	return ( num < 10 ) ? '0' + num  : '' + num;
};

function dispAmount(amount,divisibility){

	const strNum = amount.toString();
	if(divisibility > 0){

		if(amount < Math.pow(10, divisibility)){

			return "0." + paddingAmount0(strNum,0,divisibility);

		}else{

			const r = strNum.slice(-divisibility);
			const l = strNum.substring(0,strNum.length - divisibility);
			return comma3(l) + "." + r;
		}
	}else{
		return comma3(strNum);
	}
}
function comma3(strNum){
	return strNum.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function paddingAmount0(val,char,n){
	for(; val.length < n; val= char + val);
	return val;
}

function dispBlockTimeStamp(id,height){

	blockRepo1.getBlockByHeight(height)
	.subscribe(block => {

		$(id).text(
			dispTimeStamp(Number(block.timestamp.toString()),epochAdjustment)
		);
	})
}


///////////////   レシート情報   /////////////////////////////////////
function showReceiptInfo(tag,height,receipt,cnt){

	if(cnt === 0){
		cnt = "";
	}

	$("#" + tag).append("<tr>"
	+ "<td id='" + tag + "_date" + height + receipt.type + cnt + "'></td>"
	+ "<td id='" + tag + "_type' style='font-size:84%;' class='text-left'>" + sym.ReceiptType[receipt.type] + "</td>"
	+ "<td id='" + tag + "_amount' class='text-right'>" + dispAmount(receipt.amount,6) + "</td>" //mosaicLabel
	+ "</tr>"
	);

	dispBlockTimeStamp("#" + tag + "_date"+ height + receipt.type,height);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Copyボタンをクリックして、クリップボードにコピー
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Onclick_Copy(copy_address){

  console.log("Copy_address=",copy_address);       // 正しいアドレスが表示されている
  console.log("コピーボタンが押されたよ");

  
      let COPY_COMPLETE = document.createElement('div');
      COPY_COMPLETE.innerHTML = `　　　　<strong style="color: green;"><font size="6">Copied!</font></strong>`;
  
     
      const COPY_BT = document.querySelector('h2');
      console.log(COPY_BT);
        
      COPY_BT.replaceWith(COPY_COMPLETE);
      setTimeout( () => {
          COPY_COMPLETE.replaceWith(COPY_BT);
      },700); 
        
  
    navigator.clipboard.writeText(copy_address);
 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              // モザイク作成 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Onclick_mosaic(){
  
  const supplyAmount = document.getElementById("SupplyAmount").value;
  const duration = document.getElementById("Duration1").value;
  const divisibility = document.getElementById("Divisibility").value;
  const supplyMutable = document.getElementById("Supply_M").checked;
  const transferable = document.getElementById("Transferable").checked;
  const restrictable = document.getElementById("Restrictable").checked;
  const revokable = document.getElementById("Revokable").checked;
  const maxFee = document.getElementById("re_maxFee_m").value;

  console.log("duration=",duration);
  console.log("supplyMutable=",supplyMutable);
  console.log("transferable=",transferable);
  console.log("restrictable=",restrictable);
  console.log("revokable=",revokable);

//supplyMutable = true; //供給量変更の可否
//transferable = true; //第三者への譲渡可否
//restrictable = true; //制限設定の可否
//revokable = true; //発行者からの還収可否

  const address = sym.Address.createFromRawAddress(window.SSS.activeAddress); //アカウントのアドレスを取得

  const publicAccount = sym.PublicAccount.createFromPublicKey(                //アカウントの公開鍵を取得
    window.SSS.activePublicKey,
    networkType
  );

//モザイク定義
  const nonce = sym.MosaicNonce.createRandom();
  const mosaicDefTx = sym.MosaicDefinitionTransaction.create(
            undefined,
            nonce,
            sym.MosaicId.createFromNonce(nonce, address), //モザイクID
            sym.MosaicFlags.create(supplyMutable, transferable, restrictable, revokable),
            divisibility, //divisibility:可分性
            sym.UInt64.fromUint(duration), //duration:有効期限
            networkType
        );
  
    console.log(mosaicDefTx);

  const  mosaicChangeTx = sym.MosaicSupplyChangeTransaction.create(
             undefined,
             mosaicDefTx.mosaicId,
             sym.MosaicSupplyChangeAction.Increase,
             sym.UInt64.fromUint(supplyAmount), //数量
             networkType
        );

        console.log(mosaicChangeTx);

  const aggregateTx = sym.AggregateTransaction.createComplete(
          sym.Deadline.create(epochAdjustment),
          [
            mosaicDefTx.toAggregate(publicAccount),
            mosaicChangeTx.toAggregate(publicAccount),
          ],
          networkType,[],
          sym.UInt64.fromUint(1000000*Number(maxFee)) 
      )
  
      window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      })  

}

//////////////////////////////////////////////////////////////////////////
//                   モザイク供給量変更
/////////////////////////////////////////////////////////////////////////

function mosaic_supply(){
  
  const mosaic_ID = document.querySelector(".select_sup").value;
  const change_Amount = document.getElementById("change_Amount").value;
  const Type = document.getElementById("change_sup").checked;
  const maxFee = document.getElementById("re_maxFee_sup").value;

  console.log("mosaic_ID=",mosaic_ID);
  console.log("change_Amount=",change_Amount);
  console.log("Type=",Type);
  console.log("maxFee=",maxFee);
 

  if (Type === true){
      mosaicChangeTx = sym.MosaicSupplyChangeTransaction.create(
            sym.Deadline.create(epochAdjustment),
            new sym.MosaicId(mosaic_ID),
            sym.MosaicSupplyChangeAction.Increase,
            sym.UInt64.fromUint(change_Amount), //数量
            networkType,
            sym.UInt64.fromUint(1000000*Number(maxFee))//最大手数料
      );
  }else
     if (Type === false){
         mosaicChangeTx = sym.MosaicSupplyChangeTransaction.create(
               sym.Deadline.create(epochAdjustment),
               new sym.MosaicId(mosaic_ID),
               sym.MosaicSupplyChangeAction.Decrease,
               sym.UInt64.fromUint(change_Amount), //数量
               networkType,
               sym.UInt64.fromUint(1000000*Number(maxFee))//最大手数料
        );
  }

        console.log(mosaicChangeTx);
  
      window.SSS.setTransaction(mosaicChangeTx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      })  

}

//////////////////////////////////////////////////////////////////////////
//                   モザイク回収
/////////////////////////////////////////////////////////////////////////

async function revoke_mosaic(){

  let re_agg_check = document.getElementById("re_agg_check").checked;  // 一括回収チェックのフラグ
  let mosaic_ID2 = document.querySelector(".select_r").value;
  let amount2 = document.getElementById("re_amount").value;

  if (re_agg_check === false){
    if (file1 === undefined){   // ファイルが選択されていない時   ///////////////////
      if (mosaic_ID2 === "--- Select ---"){
        swal(`モザイクIDを選択してください！`,"");
      }
      let mosaicInfo = await mosaicRepo.getMosaic(new sym.MosaicId(mosaic_ID2)).toPromise();// 可分性の情報を取得する 
      let div = mosaicInfo.divisibility; // 可分性

       const holderAddress = document.getElementById("holderAddress").value;
       // const maxFee = document.getElementById("re_maxFee_r").value;

       const revoke_tx = sym.MosaicSupplyRevocationTransaction.create(
         sym.Deadline.create(epochAdjustment),
         sym.Address.createFromRawAddress(holderAddress),
         new sym.Mosaic(
           new sym.MosaicId(mosaic_ID2),     // mosice ID 16進数　
           sym.UInt64.fromUint(Number(amount2)*10**div)),      // mosaic 数量  可分性を適用する                                  
         networkType,
         //sym.UInt64.fromUint(1000000*Number(maxFee)) 
       ).setMaxFee(100); //手数料

       const fee_rev = document.getElementById("fee_rev");    // aggregate 手数料表示
       fee_rev.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(revoke_tx.maxFee.toHex(),16)/1000000} XYM　　　　</p>`

       window.SSS.setTransaction(revoke_tx);               // SSSにトランザクションを登録        
       window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
       console.log('signedTx', signedTx);
       txRepo.announce(signedTx);
       }) 
    }else{ //ファイルが選択されている場合 //////////////////////////////////////////////
              
              let innerTx = [];
              for (let i=0; i<address1.length; i++){
                  if (amount1[i] !== undefined){    // 3列目 amount がある場合
                      amount2 = amount1[i];
                  
                  }
                  if (mosaic1[i] !== undefined){    // 4列目 mosaic がある場合
                      mosaic_ID2 = mosaic1[i];
                  }else{ // mosaic ID がない場合
                    if (mosaic_ID2 === "--- Select ---"){
                      swal(`モザイクIDを選択してください！`,"");
                    }
                  }  
                  
                let mosaicInfo = await mosaicRepo.getMosaic(new sym.MosaicId(mosaic_ID2)).toPromise();// 可分性の情報を取得する 
                let div = mosaicInfo.divisibility; // 可分性

                        if (address1[i].length === 39){  // アドレスの場合
                          innerTx[i] = sym.MosaicSupplyRevocationTransaction.create(
                          undefined, //Deadline
                          sym.Address.createFromRawAddress(address1[i]), //回収先                                                            
                              new sym.Mosaic(
                                  new sym.MosaicId(mosaic_ID2),
                                  sym.UInt64.fromUint(Number(amount2)*10**div)  
                                  ),                              
                          //sym.PlainMessage.create(message),
                          networkType
                          );
                        }else{  // ネームスペースの場合
                            namespaceId = new sym.NamespaceId(address1[i]); 
                            innerTx[i] = sym.MosaicSupplyRevocationTransaction.create(
                            undefined, //Deadline
                            namespaceId, //回収先                                
                                new sym.Mosaic(
                                    new sym.MosaicId(mosaic_ID2),
                                    sym.UInt64.fromUint(Number(amount2)*10**div)  
                                    ),
                            //sym.PlainMessage.create(message),
                            networkType
                            );
                          }

                 }

                 const publicAccount = sym.PublicAccount.createFromPublicKey(
                   window.SSS.activePublicKey,
                   networkType
                 );

                 for (let i=0; i<address1.length; i++){
                     innerTx[i] = innerTx[i].toAggregate(publicAccount)
                 }

                 const aggregateTx = sym.AggregateTransaction.createComplete(
                   sym.Deadline.create(epochAdjustment),  //Deadline
                   innerTx,
                   networkType,
                   [],
                 /*sym.UInt64.fromUint(1000000*Number(maxfee2))          //最大手数料*/
                 ).setMaxFeeForAggregate(100);

                 console.log("aggregateTx====",aggregateTx)
                 console.log("aggregateTx.maxFee======",parseInt(aggregateTx.maxFee.toHex(),16)/1000000);

                 const agg_fee = document.getElementById("fee_rev");    // aggregate 手数料表示
                 agg_fee.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(aggregateTx.maxFee.toHex(),16)/1000000} XYM　　　　</p>`

                 window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
                 window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
                 console.log('signedTx', signedTx);
                 txRepo.announce(signedTx);
                 }) 
          


    }

  }else{  // 一括回収チェックが true の場合 ///////////////////////////
    if (mosaic_ID2 === "--- Select ---"){
      swal(`モザイクIDを選択してください！`,"");
    }

    const page_num = document.getElementById('page_num_holder1').value;  /////////  セレクトボックスから、Page No を取得  ///////////////////////
  
    let xhr = new XMLHttpRequest();
    
     if (networkType === 104){ // Main Net
        xhr.open("GET",`https://symbol-mikun.net:3001/accounts?mosaicId=${mosaic_ID2}&orderBy=balance&order=desc&pageSize=100&pageNumber=${page_num}`,false);
     }
     if (networkType === 152){ // Test Net
        xhr.open("GET",`https://mikun-testnet.tk:3001/accounts?mosaicId=${mosaic_ID2}&orderBy=balance&order=desc&pageSize=100&pageNumber=${page_num}`,false);
     }
  
     let data;
  
     xhr.send(null);
  
     data = xhr.response;
     data = JSON.parse(data);
     data2 = [];
     data3 = [];
     for (j=0;j<data.data.length;j++){
       for (i=0; i<data.data[j].account.mosaics.length; i++){
         if (data.data[j].account.mosaics[i].id === mosaic_ID2){
            data2.push(sym.Address.createFromEncoded(data.data[j].account.address).plain());
            data3.push(data.data[j].account.mosaics[i].amount);
         }
      
       }
     }


                  let innerTx = [];
                  for (let i=0; i<data2.length; i++){                           

                            if (data2[i].length === 39){  // アドレスの場合
			                        innerTx[i] = sym.MosaicSupplyRevocationTransaction.create(
                              undefined, //Deadline
                              sym.Address.createFromRawAddress(data2[i]), //回収先                                                            
                                  new sym.Mosaic(
                                      new sym.MosaicId(mosaic_ID2),
                                      sym.UInt64.fromUint(Number(data3[i])) 
                                      ),                              
                              //sym.PlainMessage.create(message),
                              networkType
                              );
                            }else{  // ネームスペースの場合
                                namespaceId = new sym.NamespaceId(data2[i]); 
                                innerTx[i] = sym.MosaicSupplyRevocationTransaction.create(
                                undefined, //Deadline
                                namespaceId, //回収先                                
                                    new sym.Mosaic(
                                        new sym.MosaicId(mosaic_ID2),
                                        sym.UInt64.fromUint(Number(data3[i]))  
                                        ),
                                //sym.PlainMessage.create(message),
                                networkType
                                );
                            }

                  }

                  const publicAccount = sym.PublicAccount.createFromPublicKey(
                    window.SSS.activePublicKey,
                    networkType
                  );

                  for (let i=0; i<data2.length; i++){
                      innerTx[i] = innerTx[i].toAggregate(publicAccount)
                  }

                  const aggregateTx = sym.AggregateTransaction.createComplete(
                    sym.Deadline.create(epochAdjustment),  //Deadline
                    innerTx,
                    networkType,
                    [],
                    /*sym.UInt64.fromUint(1000000*Number(maxfee2))          //最大手数料*/
                  ).setMaxFeeForAggregate(100);

                  console.log("aggregateTx====",aggregateTx)
                  console.log("aggregateTx.maxFee======",parseInt(aggregateTx.maxFee.toHex(),16)/1000000);

                  const agg_fee = document.getElementById("fee_rev");    // aggregate 手数料表示
                  agg_fee.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(aggregateTx.maxFee.toHex(),16)/1000000} XYM　　　　</p>`

                 window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
                 window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
                 console.log('signedTx', signedTx);
                 txRepo.announce(signedTx);
                 }) 

  }

}

//////////////////////////////////////////////////////////////////////////
//                   モザイク　リッチリスト
/////////////////////////////////////////////////////////////////////////

async function holder_list(){

  const page_num = document.getElementById('page_num_holder1').value;  /////////  セレクトボックスから、Page No を取得  ///////////////////////

  const mosaic_ID = document.querySelector(".select_r").value;
  
  const mosaicInfo = await mosaicRepo.getMosaic(new sym.MosaicId(mosaic_ID)).toPromise();// 可分性の情報を取得する 
  const div = mosaicInfo.divisibility; // 可分性

  const dom_holder = document.getElementById('holder_table');  // テーブルがある場合削除
       // console.log("dom_txInfo=",dom_Meta); ////////////////
  if (dom_holder !== null){ // null じゃなければ子ノードを全て削除  
    while(dom_holder.firstChild){
        dom_holder.removeChild(dom_holder.firstChild);
    }
  }
  

  let xhr = new XMLHttpRequest();
  
   if (networkType === 104){ // Main Net
      xhr.open("GET",`https://symbol-mikun.net:3001/accounts?mosaicId=${mosaic_ID}&orderBy=balance&order=desc&pageSize=100&pageNumber=${page_num}`,false);
   }
   if (networkType === 152){ // Test Net
      xhr.open("GET",`https://mikun-testnet.tk:3001/accounts?mosaicId=${mosaic_ID}&orderBy=balance&order=desc&pageSize=100&pageNumber=${page_num}`,false);
   }

   let data;

   xhr.send(null);

   data = xhr.response;
   data = JSON.parse(data);
   data2 = [];
   data3 = [];
   for (j=0;j<data.data.length;j++){

     for (i=0; i<data.data[j].account.mosaics.length; i++){
       if (data.data[j].account.mosaics[i].id === mosaic_ID){
           // console.log("amount=",data.data[j].account.mosaics[i].amount)
           //console.log(`${j} ${sym.Address.createFromEncoded(data.data[j].account.address).plain()}　　　amount= ${data.data[j].account.mosaics[i].amount}`);
          data2.push(sym.Address.createFromEncoded(data.data[j].account.address).plain());
          data3.push(data.data[j].account.mosaics[i].amount/10**div);
       }
    
     }
   }
   const dom_mosaic_rev = document.getElementById('mosaic_ID_rev');   
   dom_mosaic_rev.innerHTML = `<big>< ${mosaic_ID} ></big>`

   const dom_namespace_rev = document.getElementById('namespace_rev');
   let mosaicNames = await nsRepo.getMosaicsNames([new sym.MosaicId(mosaic_ID)]).toPromise(); // Namespaceの情報を取得する
   
   if ([mosaicNames][0][0].names.length !== 0){
     dom_namespace_rev.innerHTML = `<big> ${[mosaicNames][0][0].names[0].name} </big>`
   }else{
     dom_namespace_rev.innerHTML = ``
   }

   var body = document.getElementById("holder_table");
   body.style.width = "700px";
   body.style.margin = "0 auto";  //centerに合わせる

   // <table> 要素と <tbody> 要素を作成　/////////////////////////////////////////////////////
   var tbl = document.createElement("table");
   var tblBody = document.createElement("tbody_r");
   //tblBody.style.width = "600px";
 
   // すべてのセルを作成
   for (var i = -1; i < data.data.length; i++) {  // データの数だけ繰り返す
     // 表の行を作成
     var row = document.createElement("tr");

     for (var j = 0; j < 3; j++) {
       // <td> 要素とテキストノードを作成し、テキストノードを
       // <td> の内容として、その <td> を表の行の末尾に追加
       var cell = document.createElement("td");                                                   
          switch(j){
            case 0:   // No
              if (i === -1){
                  var cellText = document.createTextNode("No");                   
                  break;
              }                        
              var cellText = document.createTextNode(i+1+(100*(page_num-1))); // Noを追加    
                  break;
            case 1:   //アドレス
              if (i === -1){
                  var cellText = document.createTextNode("アドレス");                   
                  break;
              }                        
              var cellText = document.createTextNode(data2[i]); // アドレスをセルに追加    
                  break;
            case 2:   //数量
              if (i === -1){
                 var cellText = document.createTextNode("保有量");
                 break;
              }
                 var cellText = document.createTextNode(data3[i]);　// 数量をセルに追加 
                 break;  
                             
            }  
       cell.appendChild(cellText);
       row.appendChild(cell);
     }                     
     // 表の本体の末尾に行を追加
     tblBody.appendChild(row);
   }

   // <tbody> を <table> の中に追加
   tbl.appendChild(tblBody);
   // <table> を <body> の中に追加
   body.appendChild(tbl);
   // tbl の border 属性を 2 に設定
   tbl.setAttribute("border", "1"); 
   
   for (i=1; i<= data.data.length+1; i++){
      var firstCell = document.querySelector(`tbody_r tr:nth-child(${i}) td:nth-child(1)`);
      firstCell.style.textAlign = "right";  // 右寄せ
      firstCell.style.width = "50px"

      var firstCell = document.querySelector(`tbody_r tr:nth-child(${i}) td:nth-child(2)`);
      firstCell.style.textAlign = "center";  // 右寄せ
      firstCell.style.width = "400px"

      var thirdCell = document.querySelector(`tbody_r tr:nth-child(${i}) td:nth-child(3)`);
      thirdCell.style.textAlign = "right";  // 右寄せ
      thirdCell.style.width = "250px"
   }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              // Namespace 作成 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function Onclick_Namespace(){
  
  const Namespace = document.getElementById("Namespace").value;
  const duration = document.getElementById("Duration2").value;
  const maxFee = document.getElementById("re_maxFee_n").value;
  

  const namespaceId = new sym.NamespaceId(Namespace.toLowerCase());      
  const ns_check = await nsRepo.getNamespace(namespaceId)
                              .toPromise()
                              .catch(() => swal('New NameSpace',""));          // ネームスペース　有無のチェック
     console.log("%cns_check","color: red",ns_check);
  if (ns_check !== true){   // ネームスペースが存在する場合
    if (ns_check.ownerAddress.address !== undefined){
      if (ns_check.ownerAddress.address !== window.SSS.activeAddress){
        swal('この NameSpace は別のオーナーが使用しています!!',"");
        return;                          
      }else{
        swal('Namespace を更新します',"");
      }
    }                            
  }
  
  if (ns_check === true){ // ネームスペースがないので作成可能
      console.log("%cNew NameSpace","color: red");
  }
  
  if (Number(duration) < 86400 || Number(duration) > 5256000){
     swal('有効期限が無効です!!',"");
     return;
  }
  
  console.log("Namespace=",Namespace);
  console.log("Duration=",duration);
  console.log("maxFee===",maxFee);
  
  // ルートネームスペースをレンタルする
      const tx = sym.NamespaceRegistrationTransaction.createRootNamespace(
          sym.Deadline.create(epochAdjustment),
          Namespace,
          sym.UInt64.fromUint(duration),
          networkType,
          sym.UInt64.fromUint(1000000*Number(maxFee))   
      )

      window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      }) 

}


//  サブネームスペースを取得する /////////////////////////////////////////////////////////////
function Onclick_subNamespace(){
  
  const rootNamespace = document.getElementById("rootNamespace").value;
  const subNamespace = document.getElementById("subNamespace").value;
  const maxFee = document.getElementById("re_maxFee_sn").value;
  
  console.log("rootNamespace=",rootNamespace);
  console.log("subNamespace=",subNamespace);
  

      const tx = sym.NamespaceRegistrationTransaction.createSubNamespace(
          sym.Deadline.create(epochAdjustment),
          subNamespace,
          rootNamespace,
          networkType,
          sym.UInt64.fromUint(1000000*Number(maxFee))   
      )

      window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      }) 

}


///////////////////////////////////////////////////////////////////////////////
//                 エイリアスリンク　　
///////////////////////////////////////////////////////////////////////////////

function alias_Link(){

  const Namespace = document.querySelector(".select1").value;
  const alias_type = document.getElementById("alias_type").value;
  const Address_Mosaic = document.getElementById("Link_Address").value;
  //const Mosaic_ID = document.getElementById("Link_Mosaic_ID").value;
  const maxFee = document.getElementById("re_maxFee_L").value;
  

  console.log("Namespace=",Namespace);
  console.log("alias_type=",alias_type);
  console.log("Address_Mosaic=",Address_Mosaic)
  console.log("maxFee=",maxFee);
  console.log("alias_type=",alias_type);

  //アカウントへリンク  /////////////////////////////
  if (alias_type === "0"){
    const namespaceId = new sym.NamespaceId(Namespace);
    const address = sym.Address.createFromRawAddress(Address_Mosaic);

    tx = sym.AliasTransaction.createForAddress(
       sym.Deadline.create(epochAdjustment),
       sym.AliasAction.Link,
       namespaceId,
       address,
       networkType,
       sym.UInt64.fromUint(1000000*Number(maxFee)) 
    )
   
        window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
        window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
        console.log('signedTx', signedTx);
        txRepo.announce(signedTx);
        })
  }

  // モザイクへリンク  /////////////////////////////
  if (alias_type === "1"){
    const namespaceId = new sym.NamespaceId(Namespace);
    const mosaicId = new sym.MosaicId(Address_Mosaic);
  
    tx = sym.AliasTransaction.createForMosaic(
       sym.Deadline.create(epochAdjustment),
       sym.AliasAction.Link,
       namespaceId,
       mosaicId,
       networkType,
       sym.UInt64.fromUint(1000000*Number(maxFee)) 
    )

        window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
        window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
        console.log('signedTx', signedTx);
        txRepo.announce(signedTx);
        })    
  }

  //アカウントからリンク解除  ////////////////////////
  if (alias_type === "2"){
    const namespaceId = new sym.NamespaceId(Namespace);
    const address = sym.Address.createFromRawAddress(Address_Mosaic);

    tx = sym.AliasTransaction.createForAddress(
       sym.Deadline.create(epochAdjustment),
       sym.AliasAction.Unlink,
       namespaceId,
       address,
       networkType,
       sym.UInt64.fromUint(1000000*Number(maxFee)) 
    )
   
        window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
        window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
        console.log('signedTx', signedTx);
        txRepo.announce(signedTx);
        })
  }

  // モザイクからリンク解除 ////////////////////////////
  if (alias_type === "3"){
    const namespaceId = new sym.NamespaceId(Namespace);
    const mosaicId = new sym.MosaicId(Address_Mosaic);
  
    tx = sym.AliasTransaction.createForMosaic(
       sym.Deadline.create(epochAdjustment),
       sym.AliasAction.Unlink,
       namespaceId,
       mosaicId,
       networkType,
       sym.UInt64.fromUint(1000000*Number(maxFee)) 
    )

        window.SSS.setTransaction(tx);               // SSSにトランザクションを登録        
        window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
        console.log('signedTx', signedTx);
        txRepo.announce(signedTx);
        })    
  }
}

/////////////////////////////////////////////////////////////////////////////////
//    Metadata 登録
/////////////////////////////////////////////////////////////////////////////////

async function Metadata(){

  const Meta_type = document.getElementById("Meta_type").value;   // Metadata登録先
  const Meta_key = document.querySelector(".select_Meta").value;     // Metadata Key
  //const Meta_to = document.querySelector(".Meta_to").value;       // Address / MosaicID / Namespace
  const mosaicID = document.querySelector(".select_mo").value;   //  MosaicID
  const Namespace = document.querySelector(".select_N").value;  // Namespace
  const Meta_value = document.getElementById("Meta_value").value; // value値
  //const maxFee = document.getElementById("re_maxFee_Meta").value; //  maxFee値
  const address = sym.Address.createFromRawAddress(window.SSS.activeAddress);

  console.log("Meta_type===",Meta_type);
  //console.log("Meta_to===",Meta_to);
  console.log("Meta_key===",Meta_key);
  console.log("Meta_value===",Meta_value);
  //console.log("maxFee===",maxFee);
  console.log("Meta_address===",address);
  console.log("mosaicID===",mosaicID);
  console.log("Namespace===",Namespace);

  console.log("%cvalue UTF-8 バイト数=","color: red",bytelength(Meta_value));

  if (bytelength(Meta_value) > 1024){

      swal(`Valueのサイズが${bytelength(Meta_value)}バイトです!!

	    1024バイト 以下にしてください。`);
     return; 

  }

  const publicAccount = sym.PublicAccount.createFromPublicKey(                //アカウントの公開鍵を取得
    window.SSS.activePublicKey,
    networkType
  );

  if (Meta_key === ""){
    key = sym.KeyGenerator.generateUInt64Key(Math.random().toString(36).slice(2)); //適当な文字列からメタデータキーを生成
  }else
     if (Meta_key !== undefined){
         key = new sym.MosaicId(Meta_key); // 16進数　→ Uint64に変換
         key = key.id;
  }
  value = Meta_value;



  if (Meta_type === "0"){ // アカウントに登録 //////////////////////////       
      tx = await metaService
      .createAccountMetadataTransaction(
        undefined,
        networkType,
        address, //メタデータ記録先アドレス
        key,
        value, //Key-Value値
        address //メタデータ作成者アドレス
      )
      .toPromise();
  
      aggregateTx = sym.AggregateTransaction.createComplete(
        sym.Deadline.create(epochAdjustment),
        [tx.toAggregate(publicAccount)],
        networkType,
        []
      //sym.UInt64.fromUint(1000000*Number(maxFee))
      ).setMaxFeeForAggregate(100);

      const Meta_fee = document.getElementById("Meta_fee1");    // Meta 手数料表示
      Meta_fee.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(aggregateTx.maxFee.toHex(),16)/1000000} XYM　　　　　　　　　　　　</p>`

      window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      })

  }
  if (Meta_type === "1"){ // モザイクに登録 ///////////////////////////
      const mosaicId = new sym.MosaicId(mosaicID);
      const mosaicInfo = await mosaicRepo.getMosaic(mosaicId).toPromise();           
    
      tx = await metaService
        .createMosaicMetadataTransaction(
          undefined,
          networkType,
          mosaicInfo.ownerAddress, //モザイク作成者アドレス
          mosaicId,
          key,
          value, //Key-Value値
          address
        )
        .toPromise();
    
      aggregateTx = sym.AggregateTransaction.createComplete(
        sym.Deadline.create(epochAdjustment),
        [tx.toAggregate(publicAccount)],
        networkType,
        []
       // sym.UInt64.fromUint(1000000*Number(maxFee))
      ).setMaxFeeForAggregate(100);

      const Meta_fee = document.getElementById("Meta_fee1");    // Meta 手数料表示
      Meta_fee.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(aggregateTx.maxFee.toHex(),16)/1000000} XYM　　　　　　　　　　　　</p>`

      window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      })

  }
  if (Meta_type === "2"){ // ネームスペースに登録 /////////////////////////
      const namespaceId = new sym.NamespaceId(Namespace);
      console.log("namespaceId===",namespaceId);
      const namespaceInfo = await nsRepo.getNamespace(namespaceId).toPromise(); 
    
      tx = await metaService
        .createNamespaceMetadataTransaction(
          undefined,
          networkType,
          namespaceInfo.ownerAddress, //ネームスペースの作成者アドレス
          namespaceId,
          key,
          value, //Key-Value値
          address //メタデータの登録者
        )
        .toPromise();
    
      aggregateTx = sym.AggregateTransaction.createComplete(
        sym.Deadline.create(epochAdjustment),
        [tx.toAggregate(publicAccount)],
        networkType,
        []
      //sym.UInt64.fromUint(1000000*Number(maxFee))
      ).setMaxFeeForAggregate(100);

      const Meta_fee = document.getElementById("Meta_fee1");    // Meta 手数料表示
      Meta_fee.innerHTML =`<p style="font-size:20px;color:blue;">手数料　 ${parseInt(aggregateTx.maxFee.toHex(),16)/1000000} XYM　　　　　　　　　　　　</p>`

      window.SSS.setTransaction(aggregateTx);               // SSSにトランザクションを登録        
      window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
      console.log('signedTx', signedTx);
      txRepo.announce(signedTx);
      })
    }

}

/////////////////////////////////////////////////////////
//    文字列のバイト長(UTF-8)を得る
/////////////////////////////////////////////////////////


function bytelength(s)
{
  return encodeURI(s).replace(/%../g, "*").length;
}


/////////////////////////////////////////////////////////
//    16進数文字列かどうか判別
/////////////////////////////////////////////////////////
const rAtZ = /[A-Z]/, r0t9 = /[0-9]/;
function isHexadecimal(str) {
  //var hexRegex = /^[0-9A-F]+$/;
  //return hexRegex.test(str);
  return rAtZ.test(str) && r0t9.test(str);
}


//////////////////////////////////////////////////////////////////////////////////
//     ネームスペース　手数料計算
//////////////////////////////////////////////////////////////////////////////////


async function feeCalc(){
    const rentalBlock = document.getElementById('Duration2').value;  // 有効期限を取得  //
    console.log("レンタルブロック: "+rentalBlock);
    rentalFees = await nwRepo.getRentalFees().toPromise();
    rootNsperBlock = rentalFees.effectiveRootNamespaceRentalFeePerBlock.compact();
    rootNsRenatalFeeTotal = rentalBlock * rootNsperBlock;
    rootNsRenatalFeeTotal = rootNsRenatalFeeTotal / 1000000;
    console.log("rentalBlock:" + rentalBlock);
    console.log("rootNsRenatalFeeTotal:" + rootNsRenatalFeeTotal);
    console.log("ネームスペース作成手数料: "+rootNsRenatalFeeTotal);
      
    const ns_fee1 = document.getElementById("ns_fee");
    ns_fee1.innerHTML =`<p style="font-size:20px;color:blue;">レンタル手数料　 ${rootNsRenatalFeeTotal} XYM</p>`
    return;
  
}


//////////////////////////////////////////////////////////////////////////////////
//     モザイク有効期限計算
//////////////////////////////////////////////////////////////////////////////////

function ex_date1(){
    const rentalBlock = document.getElementById('Duration1').value;  // 有効期限を取得  //
    console.log("レンタルブロック: "+rentalBlock);
    chainRepo.getChainInfo().subscribe(chain=>{  //////////   

      rxjs.zip(
        blockRepo1.getBlockByHeight(chain.height),
        blockRepo1.getBlockByHeight(chain.latestFinalizedBlock.height),
      ).subscribe(zip => {
          
        if (rentalBlock === "0"){
           t = "無期限 ∞";
        }else{
           t = dispTimeStamp(zip[0].timestamp.compact() + (rentalBlock * 30000),epochAdjustment)
        }
          console.log("有効期限=: ",t);
    
          const ex_date1 = document.getElementById("ex_date1");
          ex_date1.innerHTML =`<p style="font-size:20px;color:blue">　　有効期限　 ${t}</p>`

      })
    })
    return;
}

//////////////////////////////////////////////////////////////////////////////////
//     ネームスペース有効期限計算
//////////////////////////////////////////////////////////////////////////////////

function ex_date2(){
  const rentalBlock = document.getElementById('Duration2').value;    // 有効期限を取得  //
  console.log("レンタルブロック: "+rentalBlock);
  chainRepo.getChainInfo().subscribe(chain=>{  //////////   

    rxjs.zip(
      blockRepo1.getBlockByHeight(chain.height),
      blockRepo1.getBlockByHeight(chain.latestFinalizedBlock.height),
    ).subscribe(zip => {
  
        t = dispTimeStamp(zip[0].timestamp.compact() + (rentalBlock * 30000),epochAdjustment)
        console.log("有効期限=: ",t);
  
        const ex_date2 = document.getElementById("ex_date2");
        ex_date2.innerHTML =`<p style="font-size:20px;color:blue">　　有効期限　 ${t}</p>`

    })
  })
  return;
}

//////////////////////////////////////////////////////////////////////////////////
//     Metadata Key　セレクトボックス
//////////////////////////////////////////////////////////////////////////////////

function MetaKey_select(){
  const Meta_type = document.getElementById('Meta_type').value;    // Metadata Typeを取得  //
  const dom_address = document.getElementById("meta_address");
 
  if (Meta_type === "0"){    // Account の時は　アドレスを表示
      dom_address.innerHTML = `<div class="meta_address"><small>　${window.SSS.activeAddress}</small></div>`
  }
  if (Meta_type === "1"){    // Mosaic
      dom_address.innerHTML = "";
  }
  if (Meta_type === "2"){    // Namespace
      dom_address.innerHTML = "";   
  }
  if (Meta_type === "-1"){   // select 
      dom_address.innerHTML = ""; 
  }
  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              //  nftData を対象のタグに挿入する //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function appendImg(src,dom_NFT){          //   取得した画像をimgタグに挿入するfunctionを定義

  (tag= document.createElement('img')).src = src;
   tag.width = 200;
   tag.className = "mosaic_img";
  //document.getElementsByTagName('body')[0].appendChild(tag);
  dom_NFT.appendChild(tag);
}
//////////////////////////////////////////////////////////////////////////////

function appendAudio(src,dom_NFT){     // Audio

  (tag= document.createElement('source')).src = src;
  // tag.width = 200;
  //document.getElementsByTagName('body')[0].appendChild(tag);
  dom_NFT.appendChild(tag);
  $('source').wrap('<audio controls>');
}
/////////////////////////////////////////////////////////////////////////////

function appendVideo(src,dom_NFT){      // Video

  (tag= document.createElement('source')).src = src;
  //tag.width = 200;
  tag.width = 600;
  //document.getElementsByTagName('body')[0].appendChild(tag);
  dom_NFT.appendChild(tag);
  $('source').wrap('<video controls>');
  }
  /////////////////////////////////////////////////////////////////////////////
  
  function appendPdf(src,dom_NFT){      // Pdf
  
  (tag= document.createElement('embed')).src = src;
  tag.width = 600;
  tag.height = 600;
  //document.getElementsByTagName('body')[0].appendChild(tag);
  dom_NFT.appendChild(tag);
  }
  /////////////////////////////////////////////////////////////////////////////
  
  function appendHtml(src,dom_NFT){      // html
  
  (tag= document.createElement('iframe')).src = src;
  tag.width = 600;
  tag.height = 600;
  //document.getElementsByTagName('body')[0].appendChild(tag);
  dom_NFT.appendChild(tag);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              //  NFT (NFTDrive) をデコードして表示する //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var nglist = [];
fetch('https://nftdrive-explorer.info/black_list/',)
.then((response) => {
    return response.text().then(function(text) {
        nglist = JSON.parse(text);      
        console.log(text);
    });
});


function nftdrive(mosaic,dom_NFT){
	mosaicRepo.getMosaic(mosaic.id)
	.pipe(
		op.filter(mo=>{
			return !nglist.find(elem => elem[1] === mo.id.toHex())
		})
	)
	.subscribe(async mo=>{

		const ownerAddress = mo.ownerAddress;
		const preTxes = await txRepo.search({
			type:[
				sym.TransactionType.TRANSFER,
			],
			address:ownerAddress,group:sym.TransactionGroup.Confirmed,pageSize:10,order:sym.Order.Asc
		}).toPromise();

		if(preTxes.data.find(tx => {
			if(tx.message === undefined){
				return false;
			}else if(tx.message.payload==="Please note that this mosaic is an NFT."){
				needSample = false;
				return true;
			}else{
				return false;
			}
		})){

			const tx = await txRepo.search({
				type:[
					sym.TransactionType.AGGREGATE_COMPLETE,
					sym.TransactionType.AGGREGATE_BONDED,
				],
				address:ownerAddress,group:sym.TransactionGroup.Confirmed,pageSize:100
			}).toPromise();

			const aggTxes = [];
			for (let idx = 0; idx < tx.data.length; idx++) {
				const aggTx = await txRepo.getTransaction(tx.data[idx].transactionInfo.hash,sym.TransactionGroup.Confirmed).toPromise();

				if(aggTx.innerTransactions.find(elem => elem.type === 16724)){
					aggTxes.push(aggTx);
				}
			}

			const sotedAggTxes = aggTxes.sort(function(a, b) {

				if (Number(a.innerTransactions[0].message.payload) > Number(b.innerTransactions[0].message.payload)) {return 1;} else {return -1;}
			})

			let nftData = "";
			let header = 15;
			for (let aggTx of sotedAggTxes) {

				for(let idx = 0 + header; idx < aggTx.innerTransactions.length;idx++){
					nftData += aggTx.innerTransactions[idx].message.payload;
				}
				header = 1;
			}
                             
			 //console.log(nftData);
       if(nftData.indexOf("data:image/") >= 0){
        dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://nftdrive-explorer.info/chart.html?net=main&mosaic=${mosaic.id.toHex()}" target="_blank">NFTDrive</a><br><br>`
        appendImg(nftData,dom_NFT);
      }
      if(nftData.indexOf("data:audio/") === 0){
        dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://nftdrive-explorer.info/chart.html?net=main&mosaic=${mosaic.id.toHex()}" target="_blank">NFTDrive</a><br><br>`
        appendAudio(nftData,dom_NFT);
      }
      if(nftData.indexOf("data:video/") === 0){ 
        dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://nftdrive-explorer.info/chart.html?net=main&mosaic=${mosaic.id.toHex()}" target="_blank">NFTDrive</a><br><br>`
        appendVideo(nftData,dom_NFT);
      }
      if(nftData.indexOf("data:application/pdf") === 0){ 
        dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://nftdrive-explorer.info/chart.html?net=main&mosaic=${mosaic.id.toHex()}" target="_blank">NFTDrive</a><br><br>`
        appendPdf(nftData,dom_NFT);
      }
      if(nftData.indexOf("data:text/html") === 0){ 
        dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://nftdrive-explorer.info/chart.html?net=main&mosaic=${mosaic.id.toHex()}" target="_blank">NFTDrive</a><br><br>`
        appendHtml(nftData,dom_NFT);
      }
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              //  NFT (COMSA) をデコードして表示する //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Buffer = require("/node_modules/buffer").Buffer;

function comsa(mosaic,dom_NFT){

mosaicRepo.getMosaic(mosaic.id)
.subscribe(async mo=>{

  let meta = await metaRepo.search({
    targetId:mo.id,
    metadataType:sym.MetadataType.Mosaic,
    pageSize:100
  }).toPromise();

  let comsaHeader = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'DA030AA7795EBE75');
  if(comsaHeader !== undefined){

    let headerJSON = JSON.parse(comsaHeader.metadataEntry.value);
    console.log("ヘッダー情報＝＝＝＝",headerJSON);
    let aggTxes1 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'D77BFE313AF3EF1F');
    let aggTxes2 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'AACFBE3CC93EABF3');
    let aggTxes3 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'A0B069B710B3754C');
    let aggTxes4 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'D75B016AA9FAC056');
    let aggTxes5 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'BABD9C10F590F0F3');
    let aggTxes6 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'D4B5933FA2FD62E7');
    let aggTxes7 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'FA60A37C56457F1A');
    let aggTxes8 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'FEDD372E157E9CF0');
    let aggTxes9 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'C9384119AD73CF95');
    let aggTxes10 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'EADE00D8D78AC0BD');
    let aggTxes11 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'F6578214308E7990');

    let aggTxes12 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'CE7226A968287482');
    let aggTxes13 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'C2811F3B6F49C568');
    let aggTxes14 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === '886A58DBE955A788');
    let aggTxes15 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === '87300B99E5B10E2C');
    let aggTxes16 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'EE553D7141B98753');
    let aggTxes17 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'B3084C09176CA990');


    let aggTxes = JSON.parse(aggTxes1.metadataEntry.value);

    if(aggTxes2 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes2.metadataEntry.value));
    }
    

    if(aggTxes3 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes3.metadataEntry.value));
    }
    
    if(aggTxes4 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes4.metadataEntry.value));
    }

    if(aggTxes5 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes5.metadataEntry.value));
    }

    if(aggTxes6 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes6.metadataEntry.value));
    }

    if(aggTxes7 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes7.metadataEntry.value));
    }

    if(aggTxes8 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes8.metadataEntry.value));
    }
    
    if(aggTxes9 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes9.metadataEntry.value));
    }

    if(aggTxes10 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes10.metadataEntry.value));
    }

    if(aggTxes11 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes11.metadataEntry.value));
    }

    if(aggTxes12 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes12.metadataEntry.value));
    }

    if(aggTxes13 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes13.metadataEntry.value));
    }

    if(aggTxes14 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes14.metadataEntry.value));
    }
    
    if(aggTxes15 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes15.metadataEntry.value));
    }

    if(aggTxes16 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes16.metadataEntry.value));
    }

    if(aggTxes17 !== undefined){
      aggTxes = aggTxes.concat(JSON.parse(aggTxes17.metadataEntry.value));
    }
  
    
    if(headerJSON.version === "comsa-nft-1.0"){  // バージョン 1.0 の場合 //////////////////////////////
      let nftData = "";
      let dataType = "data:" + headerJSON.mime_type + ";base64,";
      for (let idx = 0; idx < aggTxes.length; idx++) {              
        const aggTx = await txRepo.getTransaction(aggTxes[idx],sym.TransactionGroup.Confirmed).toPromise();
        for(let idx2 = 1; idx2 < aggTx.innerTransactions.length;idx2++){
          let payload = aggTx.innerTransactions[idx2].message.payload;
        
          nftData += payload.slice(6);
        }
      }

      dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://explorer.comsa.io/mosaic/${mosaic.id.toHex()}" target="_blank">COMSA < UNIQUE ></a><br><br>`
  
      if (dataType.indexOf("data:image/") === 0){
          appendImg(dataType + nftData,dom_NFT);
      }
      if (dataType.indexOf("data:audio/") === 0){
          appendAudio(dataType + nftData,dom_NFT);
      }
      if (dataType.indexOf("data:video/") === 0){ 
          appendVideo(dataType + nftData,dom_NFT);
      } 
    }

    if(headerJSON.version === "comsa-nft-1.1"){  //  バージョン 1.1 の場合 //////////////////////////////
      let nftData = "";
			let dataType = "data:" + headerJSON.mime_type + ";base64,";
			for(aggTx of aggTxes){

				const data = {"transactionIds": [aggTx]}
				const res =  await fetch(nodeRepo.url + "/transactions/confirmed", {
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					},
					method: "POST",
					body: JSON.stringify(data)
				});
				const json = await res.json();
				const innerTxes = json[0].transaction.transactions;
				let isSkip = true;
				for(innerTx of innerTxes){
					if(isSkip){
						isSkip = false;
						continue;
					}
					nftData += innerTx.transaction.message;
					//console.log(innerTx.transaction.message);
				}
			}

      dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://explorer.comsa.io/mosaic/${mosaic.id.toHex()}" target="_blank">COMSA < UNIQUE ></a><br><br>`

    
      if (dataType.indexOf("data:image/") === 0){
          appendImg(dataType + Buffer.from(nftData, "hex").toString("base64"),dom_NFT);
      }
      if (dataType.indexOf("data:audio/") === 0){
          appendAudio(dataType + Buffer.from(nftData, "hex").toString("base64"),dom_NFT);
      }
      if (dataType.indexOf("data:video/") === 0){ 
          appendVideo(dataType + Buffer.from(nftData, "hex").toString("base64"),dom_NFT);
      } 
    }

     
  }
});

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              //  NCFT BUNDLE (COMSA) をデコードして表示する //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function comsaNCFT(mosaic,dom_NFT){
  
	mosaicRepo.getMosaic(mosaic.id)
	.subscribe(async mo=>{
		let meta = await metaRepo.search({
			targetId:mo.id,
			metadataType:sym.MetadataType.Mosaic,
			pageSize:100
		}).toPromise();

		let comsaNcftHeader = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === '8E0823CEF8A40075');
		if(comsaNcftHeader !== undefined){
			needSample = false;
			let headerJSON = JSON.parse(comsaNcftHeader.metadataEntry.value);
			let aggTxes1 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'D77BFE313AF3EF1F');
			let aggTxes2 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'AACFBE3CC93EABF3');
			let aggTxes3 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'A0B069B710B3754C');
			let aggTxes4 = meta.data.find(tx=>tx.metadataEntry.scopedMetadataKey.toHex() === 'D75B016AA9FAC056');

			let aggTxes = JSON.parse(aggTxes1.metadataEntry.value);

			if(aggTxes2 !== undefined){
				aggTxes = aggTxes.concat(JSON.parse(aggTxes2.metadataEntry.value));
			}

			if(aggTxes3 !== undefined){
				aggTxes = aggTxes.concat(JSON.parse(aggTxes3.metadataEntry.value));
			}
			
			if(aggTxes4 !== undefined){
				aggTxes = aggTxes.concat(JSON.parse(aggTxes4.metadataEntry.value));
			}

			let nftData = "";
			let dataType = "data:" + headerJSON.mime_type + ";base64,";
			for(aggTx of aggTxes){

				const data = {"transactionIds": [aggTx]}
				const res =  await fetch(nodeRepo.url + "/transactions/confirmed", {
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					},
					method: "POST",
					body: JSON.stringify(data)
				});
				const json = await res.json();
				const innerTxes = json[0].transaction.transactions;
				let isSkip = true;
				for(innerTx of innerTxes){
					if(isSkip){
						isSkip = false;
						continue;
					}
					nftData += innerTx.transaction.message;
				}
			}
			
         dom_NFT.innerHTML =`<br><a class="btn-style-link" href="https://explorer.comsa.io/mosaic/${mosaic.id.toHex()}" target="_blank">COMSA < BUNDLE ></a><br><br>`
			//imgtarget++;
      if (dataType.indexOf("data:image/") === 0){
        appendImg(dataType + Buffer.from(nftData, "hex").toString("base64"),dom_NFT);
      }
      if (dataType.indexOf("data:audio/") === 0){
         appendAudio(dataType + Buffer.from(nftData, "hex").toString("base64"),dom_NFT);
      }
      if (dataType.indexOf("data:video/") === 0){
         appendVideo(dataType + Buffer.from(nftData, "hex").toString("base64"),dom_NFT);  
      }
			//createImgTag(dataType  + Buffer.from(nftData, "hex").toString("base64") ,imgtarget,escape_html(decodeURIComponent( sym.Convert.decodeHex(headerJSON.title))));
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                              //  ワンクリックハーベスティング  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    
 $('#txBtn').on('click', async function(){
    
  //委任先ノードの取得
  const node = $('#node').val();
  //委任アドレスの取得
  const accountInfo = await accountRepo.getAccountInfo(sym.Address.createFromRawAddress(window.SSS.activeAddress)).toPromise();
  const publicAccount = sym.PublicAccount.createFromPublicKey(
    window.SSS.activePublicKey,
    networkType
  );
  
  let accountImportance = Number(accountInfo.importance.toString()) / totalChainImportance;
  if(accountImportance > 0){
    accountImportance = Math.round( accountImportance );
    accountImportance /= 1000000;
  }else{
    swal(`インポータンスが無効です！`,`アカウントに 10,000 XYM 以上を保有して、
    約12時間経つとインポータンスが有効になります`);
    return;
  }

  let transactionList = [];

  //ノードのパプリックキーを取得
  let nodeHttp = new sym.NodeHttp('https://' + node + ':3001');
  let nodeInfo = await nodeHttp.getNodeInfo().toPromise().catch(() => swal(`ノードエラー!!`,`別のノードを選択してください`));

  if(nodeInfo === true){
       return;
  }
  
  if(networkType !== nodeInfo.networkIdentifier){
    swal(`ネットワークタイプ エラー!!`,`別のノードを選択してください`);
    return;
  }

  // epochAdjustmentの取得
  //epochAdjustment = await repositoryFactory.getEpochAdjustment().toPromise();

  //リモートアカウントの生成
  const remoteAccount = sym.Account.generateNewAccount(networkType);
  //VRFアカウントの生成
  const vrfAccount = sym.Account.generateNewAccount(networkType);


  //委任しているようであれば解除トランザクション作成
  if(accountInfo.supplementalPublicKeys.linked){
    //AccountKeyLinkTransaction （解除）
    const accountUnLink_tx = sym.AccountKeyLinkTransaction.create(
      sym.Deadline.create(epochAdjustment),
      accountInfo.supplementalPublicKeys.linked.publicKey,
      sym.LinkAction.Unlink,
      networkType,
    );
    transactionList.push(accountUnLink_tx.toAggregate(publicAccount));
  }

  if(accountInfo.supplementalPublicKeys.vrf){
    //VrfKeyLinkTransaction （解除）
    const vrfUnLink_tx = sym.VrfKeyLinkTransaction.create(
      sym.Deadline.create(epochAdjustment),
      accountInfo.supplementalPublicKeys.vrf.publicKey,
      sym.LinkAction.Unlink,
      networkType,
    );
    transactionList.push(vrfUnLink_tx.toAggregate(publicAccount));
  }

  if(accountInfo.supplementalPublicKeys.node){
    //NodeKeyLinkTransaction （解除）
    const nodeUnLink_tx = sym.NodeKeyLinkTransaction.create(
      sym.Deadline.create(epochAdjustment),
      accountInfo.supplementalPublicKeys.node.publicKey,
      sym.LinkAction.Unlink,
      networkType,
    );
    transactionList.push(nodeUnLink_tx.toAggregate(publicAccount));
  }

   //AccountKeyLinkTransaction （リンク）
   const accountLink_tx = sym.AccountKeyLinkTransaction.create(
    sym.Deadline.create(epochAdjustment),
    remoteAccount.publicKey,
    sym.LinkAction.Link,
    networkType,
  );
  transactionList.push(accountLink_tx.toAggregate(publicAccount));

  //VrfKeyLinkTransaction （リンク）
  const vrfLink_tx = sym.VrfKeyLinkTransaction.create(
    sym.Deadline.create(epochAdjustment),
    vrfAccount.publicKey,
    sym.LinkAction.Link,
    networkType,
  );
  transactionList.push(vrfLink_tx.toAggregate(publicAccount));

  //NodeKeyLinkTransaction （リンク）
  const nodeLink_tx = sym.NodeKeyLinkTransaction.create(
    sym.Deadline.create(epochAdjustment),
    nodeInfo.nodePublicKey,
    sym.LinkAction.Link,
    networkType,
  );
  transactionList.push(nodeLink_tx.toAggregate(publicAccount));

  //PersistentDelegationRequestTransactionを作成
  const persistentDelegationRequest_tx = sym.PersistentDelegationRequestTransaction.createPersistentDelegationRequestTransaction(
    sym.Deadline.create(epochAdjustment),
    remoteAccount.privateKey,
    vrfAccount.privateKey,
    nodeInfo.nodePublicKey,
    networkType,
  );
  transactionList.push(persistentDelegationRequest_tx.toAggregate(publicAccount));

  //アグリゲートでまとめる
  const aggregate_tx = sym.AggregateTransaction.createComplete(
    sym.Deadline.create(epochAdjustment),
    transactionList,
    networkType,
    [],
  ).setMaxFeeForAggregate(100);

  window.SSS.setTransaction(aggregate_tx);               // SSSにトランザクションを登録        
  window.SSS.requestSign().then(signedTx => {   // SSSを用いた署名をユーザーに要求
  console.log('signedTx', signedTx);
  txRepo.announce(signedTx);
  })  

});


///////////////////////////////////////////////////////////////////////////
// 配列の中に指定した文字列があるか検索して、あれば true を返す関数
///////////////////////////////////////////////////////////////////////////

function searchArray(array, searchString) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === searchString) {
      return true;
    }
  }
  return false;
}