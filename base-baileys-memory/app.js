const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
  "Un placer poder ayudarte"
)

const flowCosto = addKeyword([
  "costo",
  "costos",
  "honorarios",
  "valor",
  "presupuesto",
  "cotizacion",
])
  .addAnswer(
    "Para poder enviarte un presupuesto necesitamos analizar tu situación"
  )
  .addAnswer("Dejanos tu correo para contactarte");

const flowOptMonot1 = addKeyword(["1", "1-"])
  .addAnswer(
    //"A continuación te enviamos un link para acceder al formulario de inscripción a monotributo"
    "A continuación podrás acceder a un link para rellenar un formulario de alta como monotributista. Los honorarios correspondientes por dicho tramite son de $35.000 , si necesitas asesoramiento no dudes en consultarnos"
  )
  .addAnswer("https://monotributo.net/formularios/monotributo.php");

const flowOptMonot2 = addKeyword(["2", "2-"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowOptMonot3 = addKeyword(["3", "3-"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowMonot = addKeyword(["1", "1-", "monotributo"]).addAnswer(
  [
    "0- Volver al menú principal",
    "1- Quiero inscribirme al Monotributo",
    "2- Ya estoy inscripto, necesito asesoramiento",
    "3- No estoy inscripto, necesito asesoramiento",
  ],
  null,
  null,
  [flowOptMonot1, flowOptMonot2, flowOptMonot3]
)

const flowOptInscripto1 = addKeyword(["1", "1-"])
  .addAnswer(
    //"A continuación te enviamos un link para acceder al formulario de inscripción a RI"
    "A continuación podrás acceder a un link para rellenar un formulario de alta como Responsable Inscripto. Los honorarios correspondientes por dicho trámite son de $50.000 , si necesitas asesoramiento no dudes en consultarnos"
  )
  .addAnswer("https://monotributo.net/formularios/responsableInscripto.php");

const flowOptInscripto2 = addKeyword(["2", "2-"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowOptInscripto3 = addKeyword(["3", "3-"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowOptInscripto4 = addKeyword(["4", "4-"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowInscripto = addKeyword(["2", "2-", "inscripto"]).addAnswer(
  [
    "0- Volver al menú principal",
    "1- Quiero ser responsable inscripto",
    "2- Ya soy ri, necesito asesoramiento",
    "3- No soy ri, necesito asesoramiento",
    "4- Soy monotributista, quiero pasarme a ri",
  ],
  null,
  null,
  [flowOptInscripto1, flowOptInscripto2, flowOptInscripto3]
)

const flowOrigen = addKeyword(["3", "3-", "origen"]).addAnswer(
  "Perfecto, los honorarios correspondientes por dicho trámite son de $30.000 , te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowBonos = addKeyword(["4", "4-", "bonos"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowBlanqueo = addKeyword(["5", "5-", "blanqueo"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowHabla = addKeyword(["6", "6-", "habla"]).addAnswer(
  "Perfecto, te vamos a solicitar por favor un mail de contacto, a la brevedad un profesional se estará contactando",
  { capture: true },
  (ctx, { fallBack }) => {
    if (!ctx.body.includes("@")) {
      return fallBack("El correo es inválido, intenta nuevamente.");
    } else {
      return fallBack("Gracias, un profesional te contactará pronto.");
    }
  }
)

const flowAcerca = addKeyword(["7", "7-", "acerca"]).addAnswer([
  "Acerca de nosotros:",
  "Hola! Monotributo.Net es una página de trámites y asesoramiento impositivo, en la cual vas a poder realizarlos de manera segura.",
  "Contamos con profesionales recibidos y matriculados. Que tienen más de 10 años de experiencia en el campo de los impuestos, especializados principalmente en el Régimen del Monotributo. Además, tenemos la información actualizada de AFIP para brindarte el mejor asesoramiento en tiempo y forma. Contá con nuestra experiencia para ayudarte!",
])

// Obtiene la hora actual (Arg) por si el server está afuera
const horaActual = new Date().toLocaleString("en-US", { hour: 'numeric', hour12: false, timeZone: "America/Argentina/Buenos_Aires" });


const buenas = async () => {
  if (horaActual >= 6 && horaActual < 12) {
    buenos = "¡Buenos días!";
  } else if (horaActual >= 12 && horaActual < 18) {
    buenos = "¡Buenas tardes!";
  } else {
    buenos = "¡Buenas noches!";
  }
  return buenos;
}
const flowPrincipal = addKeyword(["hola", "buenas", "consulta", "0"])
  .addAnswer("¡Hola!", null, async (ctx, { flowDynamic }) => {
    const data = await buenas();
    await flowDynamic(data);
  })
  .addAnswer("🙌 Bienvenid@ al Chatbot de Monotributo.Net", {
    delay: 1000,
  })
  .addAnswer("Por favor elegí una opción para recibir información:", {
    delay: 1000,
  })

  .addAnswer(
    [
      "👉 1- Monotributo",
      "👉 2- Responsable Inscripto",
      "👉 3- Origen de fondos",
      "👉 4- Bonos mensuales",
      "👉 5- Consultanos sobre blanqueo de capitales",
      "👉 6- Habla con nosotros",
      "👉 7- Info sobre nosotros",
    ],
    null,
    null,
    [
      flowGracias,
      flowMonot,
      flowInscripto,
      flowOrigen,
      flowBonos,
      flowBlanqueo,
      flowHabla,
      flowAcerca,
      flowCosto,
    ]
  )

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
  //para cambiar puerto QRPortal({port:4000})
}

main();
