const axios = require("axios")
const cheerio = require("cheerio")
const express = require('express');
const fs = require('fs');
const app = express();
const {
	TelegramClient
} = require("telegram");
const {
	StringSession
} = require("telegram/sessions");
const {
	NewMessage
} = require("telegram/events");
const {
	EditedMessage,
	EditedMessageEvent
} = require("telegram/events/EditedMessage");
const input = require("input");

const PORT = process.env.PORT || 8080;

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

var achou = false;
var db = JSON.parse(fs.readFileSync("db.json"));

const apiId = 25805879
const apiHash = "effcc8a33f31af22c37544523b7996d0";
const stringSession = new StringSession(
	"1AQAOMTQ5LjE1NC4xNzUuNTQBu25LiKJZBqlcVo/n4r/9/G7SEzGVqb/chU2Mld8WTrYpIdQGim3ReFeUlzSbw6D6tQxeWendSS/Ru5JlInzMx/xMJWcJNFx9PtpDS9nUD9R725M1kEqw6lCGujnhk46l3alZfep1kIZQzow7mTCaGUNsQ0k/cN+uIhUC5NYPWdY6oukPEar9nOId+VI5otrrD7kYWiS2+zAOyQ0/QVQ/+I56k1UcYCqNYScanqLD1Vljts3YXgG2nfvAsUX5x+V/nBuRusWpxKrI8CZG7eA9MKbbX/gvyMpVuy26gzbmJ52SIMTNsbPIl4p7AwIpdF2MxalYh4s0jNQ72cX3EAFgElM="
);
const telegram = new TelegramClient(stringSession, apiId, apiHash, {
	connectionRetries: 5
});
(async () => {
	await telegram.start({
		phoneNumber: "5517991667512",
		password: async () => await input.text("insira sua senha: "),
		phoneCode: async () =>
		await input.text("Insira o codigo recebido no seu telegram: "),
		onError: (err) => console.log(err)
	});
	console.log("TELEGRAM: Conectado com sucesso!");
	console.log(telegram.session.save());
	await telegram.sendMessage("me", {
		message: "To Online!"
	});
})();
const Grupos = [
{ chat: "consultas_on", comando: 'cpf',bot:'Privofc_Bot'},
{ chat: "consultas_on", comando: 'nome',bot:'Privofc_Bot'},
{ chat: "puxada0", comando: 'telefone',bot:'SkynetBlackRobot'},
{ chat: "SingularShop", comando: 'cpf3',bot:'Skynet08Robot'},
{ chat: "puxada0", comando: 'placa',bot:'SkynetBlackRobot'},
    // Adicione mais grupos conforme necessário
];
function getCommandForGroup(type) {
    const grupo = Grupos.find(g => g.comando === type);
    if (grupo) {
        return grupo.comando;
    }
    return type;
}
function getGroupForCommand(command) {
    const grupo = Grupos.find(g => g.comando === command);
    if (grupo) {
        const { chat, comando, bot } = grupo;
        return [{ chat, comando, bot }];
    }
    return { chat: "CONSULTASFREEHOLLY", comando: 'cpf', bot:'HOLLLYBUSCAS23BOT' }; // Ou um valor padrão, dependendo do caso
}

app.get("/sayo/:type/:q", async (req, res) => {
    const type = req.params.type.toLowerCase() || '';
    const query = req.params.q.toLowerCase() || '';

    // ... (restante do código)

        const comando = getCommandForGroup(type);
        let grupo = getGroupForCommand(comando);
console.log(grupo)
  if (grupo && grupo[0] && grupo[0].chat) {
    await telegram.sendMessage(grupo[0].chat, {
        message: `/${grupo[0].comando} ${query}`
    })
    .catch((e) => {
        res.json({
            error: "Não foi possível fazer a consulta"
        })
        console.log("DEBUG NO CÓDIGO:", e)
    });
} else {
    res.json({
        error: "Grupo não encontrado para o comando especificado"
    });
}


	async function OnMsg(event) {
		const message = event.message;
		const textPure =
		message && message.text ?
		message.text:
		message && message.message ?
		message.message: '';
		const text =
		message && message.text ?
		message.text.toLowerCase():
		message && message.message ?
		message.message.toLowerCase(): '';
		const msgMarked = await message.getReplyMessage();
		const msgMarkedText =
		msgMarked && msgMarked.text ?
		msgMarked.text.toLowerCase():
		msgMarked && msgMarked.message ?
		msgMarked.message.toLowerCase(): '';
		const sender = await message.getSender();
		const senderId = sender && sender.username ? sender.username: '';
		const chat = await message.getChat();
		const chatId = chat && chat.username ? chat.username: '';
		for (let i of grupo) {
			try {
				if ((chatId == i.chat && senderId == i.bot) &&
					((msgMarkedText.includes(query)) ||
						text.includes(query))) {
					achou = true;
					await telegram.markAsRead(chat);
					console.log(`text: ${textPure}, msgMarked: ${msgMarkedText}`)
					if (text.includes("Não encontrad"))
						return res.json({
						error: "Não encontrado"
					});
					if (text.includes("⚠️"))
						return res.json({
						error: "Não encontrado"
					});
						if (text.includes("Não encontrado"))
						return res.json({
						error: "Não encontrado"
					});
			
						
								if (message.media) {
							if (message.media.hasOwnProperty("photo")) {
								const buffer = await telegram.downloadMedia(message, {});
								console.log(buffer)
							const base64String = Buffer.from(buffer).toString('base64');
console.log(base64String);
res.json({
						resultado: {
							image: true,
									file: false,
										legenda:str,
									base64: base64String
									}
					});					
					
					return;
							} else if (message.media.hasOwnProperty("document")) {
							const buffer = await telegram.downloadMedia(message, {});
					const base64String = Buffer.from(buffer).toString('base64');
console.log(base64String);

res.json({
						resultado: {
							image: false,
			
									file: true,
									base64: base64String
									}
					});					
					
					return;
					}
					}
				}
				if ((chatId == i.chat && senderId == i.bot) &&
					((msgMarkedText.includes(query)) &&
						text.includes(query))) {
					achou = true;
					await telegram.markAsRead(chat);
					let str = textPure;
					str = str.replace(/🔛 \*\*BY:\*\* @SkynetBlackRobot|\*\*|  |`|  | 🔍/gi, "");
					str = str.replace(/\n\n\n|USUÁRIO: Huhh/gi, '');
					str = str.replace(/• USUÁRIO: Huhh/gi, '');
					str = str.replace(/PRIV CONSULTA /gi, '');
					str = str.replace(/\n\n• USUÁRIO: Huhh\n\nBY: @FragBuscasBot/gi, '');
					str = str.replace(/USUÁRIO: Huhh/gi, '');
						str = str.replace(/\n👤/gi, '');
								str = str.replace(/PRIV CONSULTA \[BOT\]\n/gi, '');
								str = str.replace(/\*\*#INFORMAÇÕES\*\* \*\*#DO\*\* \*\*#USUÁRIO\*\*\*:/g, '');
									str = str.replace(/ [BOT]\n/gi, '');
								str = str.replace(/\*\*PRIV CONSULTA \[BOT\]\*\*|\[BOT\]\n/g, '');
								
			
												str = str.replace(/PRIV CONSULTA \[BOT\]\n/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot Huhh\n\n/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot\n\n/gi, '');
str = str.replace(/\nCONSULTA PATROCINADA POR: https:\/\/syxsearch.tech\n\n/gi, '');
str = str.replace(/\Informações do Usuário:/gi, '');
str = str.replace(/\📛 Nome: Felipe SDS/gi, '');
str = str.replace(/\🌐 Usuário: @FelipeSDSzwrka/gi, '');
str = str.replace(/𝙏𝙀𝙉𝙃𝘼 𝘾𝙊𝙉𝙎𝙄𝙇𝙏𝘼𝙎 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙎 𝘼𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝘼𝙎 𝘾𝙊𝙉𝙏𝘼𝙏𝘼𝙉𝘿𝙊 𝙐𝙐 𝘿𝙀 𝙉𝙊𝙎𝙎𝙊𝙎 𝙋𝘼𝙄𝙉𝙀𝙄𝙎 𝙋𝙇𝘼𝙉𝙊𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 40 𝙍𝙀𝘼𝙄𝙎/gi, '');
str = str.replace(/\𝙏𝙀𝙉𝙃𝘼 𝘾𝙊𝙉𝙎𝙐𝙇𝙏𝘼𝙎 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙎 𝘼𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝘼𝙎𝘾𝙊𝙈 𝙏𝙊𝙏𝘼𝙇 𝙋𝙍𝙄𝙑𝘼𝘾𝙄𝘿𝘼𝘿𝙀 𝘾𝙊𝙉𝙏𝙍𝘼𝙏𝘼𝙉𝘿𝙊 𝙐𝙈 𝘿𝙀 𝙉𝙊𝙎𝙎𝙊𝙎 𝙋𝘼𝙄𝙉𝙀́𝙄𝙎 𝙋𝙇𝘼𝙉𝙊𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 40 𝙍𝙀𝘼𝙄𝙎/gi, '');
str = str.replace(/\#𝘾𝙃𝘼𝙈𝙀:@HOLLYWOODPAINEL/gi, '');
str = str.replace(/\🆔 ID: 6704877714/gi, '');
					str = str.replace(/USUÁRIO: Huhh/gi, '');		
					str = str.replace(/\n👤/gi, '');

str = str.replace(/#INFORMAÇÕES #DO #USUÁRIO:/g, '');
str = str.replace(/🧑🏻 #NOME: Felipe SDS/g, '');
str = str.replace(/🌐 #USUÁRIO: @FelipeSDSzwrka/g, '');
str = str.replace(/🆔 #ID: 6704877714/g, '');
str = str.replace(/𝙏𝙀𝙉𝙃𝘼 𝘾𝙊𝙉𝙎𝙐𝙇𝙏𝘼𝙎 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙎 𝘼𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝘼𝙎 𝘼 𝘾𝙊𝙈 𝙏𝙊𝙏𝘼𝙇 𝙋𝙍𝙄𝙑𝘼𝘾𝙄𝘿𝘼𝘿𝙀 𝘾𝙊𝙉𝙏𝙍𝘼𝙏𝘼𝙉𝘿𝙊 𝙐𝙈 𝘿𝙀 𝙉𝙊𝙎𝙎𝙊𝙎 𝙋𝘼𝙄𝙉𝙀𝙄𝙎 𝙋𝙇𝘼𝙉𝙊𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 30 𝙍𝙀𝘼𝙄𝙎/g, '');
str = str.replace(/\𝙏𝙀𝙉𝙃𝘼 𝘾𝙊𝙉𝙎𝙐𝙇𝙏𝘼𝙎 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙎 𝘼𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝘼𝙎𝘾𝙊𝙈 𝙏𝙊𝙏??𝙇 𝙋𝙍𝙄𝙑𝘼𝘾𝙄𝘿𝘼𝘿𝙀 𝘾𝙊𝙉𝙏𝙍𝘼𝙏𝘼𝙉𝘿𝙊 𝙐𝙈 𝘿𝙀 𝙉𝙊𝙎𝙎𝙊𝙎 𝙋𝘼𝙄𝙉𝙀́𝙄𝙎 𝙋𝙇𝘼𝙉𝙊𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 30 𝙍𝙀𝘼𝙄𝙎/g, '');
str = str.replace(/𝙏𝙀𝙉𝙃𝘼 𝘾𝙊𝙉𝙎𝙄𝙇𝙏𝘼𝙎 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙎 𝘼𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝘼𝙎 𝘾𝙊𝙉𝙏𝘼𝙏𝘼𝙉𝘿𝙊 𝙐𝙐 𝘿𝙀 𝙉𝙊𝙎𝙎𝙊𝙎 𝙋𝘼𝙄𝙉𝙀𝙄𝙎 𝙋𝙇𝘼𝙉𝙊𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 30 𝙍𝙀𝘼𝙄𝙎/g, '');

str = str.replace(/𝙏𝙀𝙉𝙃𝘼 𝘾𝙊𝙉𝙎𝙐𝙇𝙏𝘼𝙎 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙎 𝘼𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘿𝘼𝙎  𝘾𝙊𝙈 𝙏𝙊𝙏𝘼𝙇 𝙋𝙍𝙄𝙑𝘼𝘾𝙄𝘿𝘼𝘿𝙀 𝘾𝙊𝙉𝙏𝙍𝘼𝙏𝘼𝙉𝘿𝙊 𝙐𝙈 𝘿𝙀 𝙉𝙊𝙎𝙎𝙊𝙎 𝙋𝘼𝙄𝙉𝙀́𝙄𝙎 𝙋𝙇𝘼𝙉𝙊𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 40 𝙍𝙀𝘼𝙄𝙎/g, '');
str = str.replace(/𝘾𝙃𝘼𝙈𝙀:  @HOLLYWOODPAINEL/g, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot Huhh\n\n/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot\n\n/gi, '');
str = str.replace(/_--_Doom\n/gi, '');
str = str.replace(/DEV: @Doom_oficial\n/gi, '');
str = str.replace(/GRUPO: @privgratis/gi, '');
str = str.replace(/\nCONSULTA PATROCINADA POR: https:\/\/syxsearch.tech\n\n/gi, '');
str = str.replace(/^\s*[\r\n]/gm, '');

let currentObject = {};
const lines = str.split("\n");
let currentAddress = {};

for (const t of lines) {
  const keyValuePair = t.split(": ");
  let key = keyValuePair[0]
    .replace(/\//g, " ")
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    })
    .replace(/ |•|-|•|/g, "");
  let value = keyValuePair[1];

  if (key.startsWith("ENDEREÇO") || key === "NUMERO") {
    // Se a chave começa com "ENDEREÇO" ou é "NUMERO", trata como parte do endereço
    if (currentObject["ENDEREÇOS"] === undefined) {
      currentObject["ENDEREÇOS"] = [];
    }

    if (Object.keys(currentAddress).length > 0) {
      currentObject["ENDEREÇOS"].push(currentAddress);
      currentAddress = {}; // Reinicia o objeto para o próximo endereço
    }
  } else if (key.startsWith("LO") || key === "COMPLEMENTO" || key === "BAIRRO" || key === "CIDADE") {
    // Se a chave começa com "LO" ou é "COMPLEMENTO", "BAIRRO" ou "CIDADE", trata como parte do endereço
    const addressKey = key.replace(/LOGRADOURO_/, "");
    currentAddress[addressKey] = value;
  } else if (key === "CEP") {
    // Adiciona informações adicionais ao endereço
    currentAddress[key] = value;
  } else {
    // Processa outras chaves normalmente
    currentObject[key] = value;
  }
}

// Adiciona o último endereço, se houver
if (Object.keys(currentAddress).length > 0) {
  currentObject["ENDEREÇOS"].push(currentAddress);
}

res.json({
  resultado: currentObject
});



	}
				return;
				
			} catch (e) {
				if (achou) return;
				res.json({
					error: "error no servidor, não foi possivel fazer a consulta"
				})
				console.log(e);
			}
		}
	}
	async function OnEditedMsg(event) {
		try {
			const message = event.message;
			const textPure = message.text || message.message;
			const text = message.text.toLowerCase() || message.message.toLowerCase();
			const sender = await message.getSender();
			const senderId = sender && sender.username ? sender.username: '';
			const chat = await message.getChat();
			const chatId = chat && chat.username ? chat.username: '';
			const msgMarked = await message.getReplyMessage();
			const msgMarkedText = msgMarked.text.toLowerCase() || msgMarked.message.toLowerCase();
			for (let i of grupo) {
				try {
					if ((chatId == i.chat && senderId == i.bot) &&
						((msgMarkedText.includes(query)) ||
							text.includes(query))) {
									achou = true;
					await telegram.markAsRead(chat);
								console.log(`text: ${textPure}, msgMarked: ${msgMarkedText}`)
				
						if (text.includes("não encontrado"))
							return res.json({
							error: "não encontrado"
						});
								if (text.includes("⚠️"))
						return res.json({
						error: "CPF Invalido"
					});
						if (text.includes("inválid"))
							return res.json({
							error: "invalido"
						});
				if (message.media) {
							if (message.media.hasOwnProperty("photo")) {
								const buffer = await telegram.downloadMedia(message.photo, {});
							const base64String = Buffer.from(buffer).toString('base64');
console.log(base64String);
res.json({
						resultado: {
							image: true,
									file: false,
										legenda:str,
									base64: base64String
									}
					});					
					
					return;
							} else if (message.media.hasOwnProperty("document")) {
							const buffer = await telegram.downloadMedia(message, {});
					const base64String = Buffer.from(buffer).toString('base64');
console.log(base64String);

res.json({
						resultado: {
							image: false,
			
									file: true,
									base64: base64String
									}
					});					
					
					return;
					}
					};
					let str = textPure;
					str = str.replace(/🔛 \*\*BY:\*\* @SkynetBlackRobot|\*\*|• |`|🔍 | 🔍/gi, "");
					str = str.replace(/\n\n\n|USUÁRIO: Huhh/gi, '');
					str = str.replace(/CONSULTA DE TELEFONE\n\n/gi, '');
					str = str.replace(/CONSULTA DE CPF\n\n/gi, '');
					str = str.replace(/• USUÁRIO: Huhh/gi, '');
					str = str.replace(/\n\n• USUÁRIO: Huhh\n\nBY: @FragBuscasBot/gi, '');
			str = str.replace(/\n👤/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot Huhh\n\n/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot\n\n/gi, '');
str = str.replace(/\nCONSULTA PATROCINADA POR: https:\/\/syxsearch.tech\n\n/gi, '');

					str = str.replace(/USUÁRIO: Huhh/gi, '');
					str = str.replace(/𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗖𝗣𝗙\n\n/gi, '');
					str = str.replace(/𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗣𝗟𝗔𝗖𝗔\n\n/gi, '');
					str = str.replace(/𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n/gi, '');
					str = str.replace(/𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗡𝗢𝗠𝗘\n\n/gi, '');
					str = str.replace(/👤 USUÁRIO: Huhh\n\n/gi, '');
str = 		str = str.replace(/\n👤/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot Huhh\n\n/gi, '');
str = str.replace(/🤖 BY: @AnoninoBuscasOfcBot\n\n/gi, '');
str = str.replace(/ \nCONSULTA PATROCINADA POR: https:\/\/syxsearch.tech/gi, '');


						
					

str = str.replace(/^\s*[\r\n]/gm, '');

let currentObject = {};
const lines = str.split("\n");
let currentAddress = {};

for (const t of lines) {
  const keyValuePair = t.split(": ");
  let key = keyValuePair[0]
    .replace(/\//g, " ")
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    })
    .replace(/ |•|-|•|/g, "");
  let value = keyValuePair[1];

  if (key.startsWith("ENDEREÇO") || key === "NUMERO") {
    // Se a chave começa com "ENDEREÇO" ou é "NUMERO", trata como parte do endereço
    if (currentObject["ENDEREÇOS"] === undefined) {
      currentObject["ENDEREÇOS"] = [];
    }

    if (Object.keys(currentAddress).length > 0) {
      currentObject["ENDEREÇOS"].push(currentAddress);
      currentAddress = {}; // Reinicia o objeto para o próximo endereço
    }
  } else if (key.startsWith("LO") || key === "COMPLEMENTO" || key === "BAIRRO" || key === "CIDADE") {
    // Se a chave começa com "LO" ou é "COMPLEMENTO", "BAIRRO" ou "CIDADE", trata como parte do endereço
    const addressKey = key.replace(/LOGRADOURO_/, "");
    currentAddress[addressKey] = value;
  } else if (key === "CEP") {
    // Adiciona informações adicionais ao endereço
    currentAddress[key] = value;
  } else {
    // Processa outras chaves normalmente
    currentObject[key] = value;
  }
}

// Adiciona o último endereço, se houver
if (Object.keys(currentAddress).length > 0) {
  currentObject["ENDEREÇOS"].push(currentAddress);
}
res.json({
  resultado: jsonObject
});

}
					return;
				} catch (e) {
					if (achou) return;
					res.json({
						error: "error no servidor, não foi possivel fazer a consulta"
					})
					console.log(e);
				}
			}
		} catch (e) {
			if (achou) return;
			res.json({
				error: "error no servidor, não foi possivel fazer a consulta"
			})
			console.log(e);
		}
	}
	telegram.addEventHandler(OnMsg, new NewMessage({}));
	//telegram.addEventHandler(OnEditedMsg, new EditedMessage({}));
	setTimeout(() => {
		if (achou) return;
		res.json({
			error: "servidor demorou muito para responder"
		});
	},
		15000);
});


app.set('json spaces', 4);

app.listen(PORT, () => {
  console.log(`Aplicativo radando em: http://localhost:${PORT}`);
});