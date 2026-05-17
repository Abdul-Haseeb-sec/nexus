import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = {
  welcome_to: "WELCOME TO",
  tagline: "YOUR DIGITAL UNIVERSE. CENTRALIZED.",
  enter: "ENTER NEXUS",
  features: {
    launcher: "App Launcher",
    calendar: "Calendar",
    secretary: "Secretary",
    friends: "Friends & DMs",
    video: "Video Calls",
    theme: "Dark & Light"
  },
  auth: {
    signup: "SIGN UP",
    signin: "SIGN IN",
    username: "USERNAME",
    email: "EMAIL",
    password: "PASSWORD",
    send_verification: "SEND VERIFICATION",
    enter_nexus: "ENTER NEXUS",
    verify_email: "Verify Email",
    code_sent: "Code sent to",
    demo_code: "DEMO CODE",
    enter_code: "ENTER 6-DIGIT CODE",
    verify_enter: "VERIFY & ENTER",
    back: "← Back",
    all_required: "All fields required.",
    username_min: "Username min 3 chars.",
    username_taken: "Username taken. Try another.",
    wrong_code: "Wrong code. Hint:",
    fill_fields: "Fill all fields."
  },
  onboard: {
    step_of: "STEP {{step}} OF {{total}}",
    title: "Build Your Universe",
    selected: "{{count}}/{{total}} selected",
    select_all: "SELECT ALL",
    deselect_all: "DESELECT ALL",
    next: "NEXT: {{label}} →",
    launch: "🚀 LAUNCH NEXUS →"
  },
  dashboard: {
    apps: "Apps",
    calendar: "Calendar",
    secretary: "Secretary",
    friends: "Friends",
    good: "Good",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    focus_mode: "◆ FOCUS MODE — WORK ONLY",
    muted: "🔇 ALL LAUNCHES MUTED",
    voice_commands: "VOICE COMMANDS",
    add: "+ ADD",
    add_app: "Add App",
    to_category: "TO {{category}}",
    app_name: "App name",
    app_url: "https://example.com",
    add_app_btn: "ADD APP",
    out: "OUT"
  },
  calendar_view: {
    import_ics: "IMPORT .ICS",
    upcoming: "UPCOMING",
    no_upcoming: "No upcoming events",
    add_event: "Add Event",
    event_title: "Event title",
    time: "Time (e.g. 14:30)",
    notes_optional: "Notes (optional)",
    color: "Color:",
    add_event_btn: "ADD EVENT",
    click_hint: "Click event to delete · Click day to add"
  },
  secretary_view: {
    todays_schedule: "TODAY'S SCHEDULE",
    no_events: "No events today ✨",
    coming_up: "COMING UP",
    quick_notes: "QUICK NOTES",
    add_note: "Add a note...",
    todo: "TO-DO",
    add_task: "Add task...",
    all_clear: "All clear 🎯"
  },
  friends_view: {
    find_friends: "FIND FRIENDS",
    search_placeholder: "@username",
    friends_count: "FRIENDS ({{count}})",
    not_found: "{{tag}} not found",
    add: "ADD",
    search_hint: "Search by @username to add friends",
    select_friend: "Select a friend to start chatting",
    no_messages: "No messages yet. Say hi! 👋",
    message: "Message...",
    call: "📹 CALL",
    room: "Room:"
  },
  footer: {
    free: "FREE · VERIFIED ACCOUNTS · END-TO-END SECURE"
  }
};

const es = {
  welcome_to: "BIENVENIDO A",
  tagline: "TU UNIVERSO DIGITAL. CENTRALIZADO.",
  enter: "ENTRAR A NEXUS",
  features: {
    launcher: "Lanzador de Apps",
    calendar: "Calendario",
    secretary: "Secretaría",
    friends: "Amigos y DMs",
    video: "Videollamadas",
    theme: "Oscuro y Claro"
  },
  auth: {
    signup: "REGISTRARSE",
    signin: "INICIAR SESIÓN",
    username: "USUARIO",
    email: "CORREO",
    password: "CONTRASEÑA",
    send_verification: "ENVIAR VERIFICACIÓN",
    enter_nexus: "ENTRAR A NEXUS",
    verify_email: "Verificar Correo",
    code_sent: "Código enviado a",
    demo_code: "CÓDIGO DEMO",
    enter_code: "INGRESA CÓDIGO DE 6 DÍGITOS",
    verify_enter: "VERIFICAR Y ENTRAR",
    back: "← Volver",
    all_required: "Todos los campos son obligatorios.",
    username_min: "Usuario mínimo 3 caracteres.",
    username_taken: "Usuario ya existe. Intenta otro.",
    wrong_code: "Código incorrecto. Pista:",
    fill_fields: "Completa todos los campos."
  },
  onboard: {
    step_of: "PASO {{step}} DE {{total}}",
    title: "Construye Tu Universo",
    selected: "{{count}}/{{total}} seleccionados",
    select_all: "SELECCIONAR TODO",
    deselect_all: "DESELECCIONAR TODO",
    next: "SIGUIENTE: {{label}} →",
    launch: "🚀 LANZAR NEXUS →"
  },
  dashboard: {
    apps: "Apps",
    calendar: "Calendario",
    secretary: "Secretaría",
    friends: "Amigos",
    good: "Buen",
    morning: "Día",
    afternoon: "Tarde",
    evening: "Noche",
    focus_mode: "◆ MODO ENFOQUE — SOLO TRABAJO",
    muted: "🔇 TODOS LOS LANZAMIENTOS SILENCIADOS",
    voice_commands: "COMANDOS DE VOZ",
    add: "+ AGREGAR",
    add_app: "Agregar App",
    to_category: "A {{category}}",
    app_name: "Nombre de app",
    app_url: "https://ejemplo.com",
    add_app_btn: "AGREGAR APP",
    out: "SALIR"
  },
  calendar_view: {
    import_ics: "IMPORTAR .ICS",
    upcoming: "PRÓXIMOS",
    no_upcoming: "No hay eventos próximos",
    add_event: "Agregar Evento",
    event_title: "Título del evento",
    time: "Hora (ej. 14:30)",
    notes_optional: "Notas (opcional)",
    color: "Color:",
    add_event_btn: "AGREGAR EVENTO",
    click_hint: "Clic en evento para eliminar · Clic en día para agregar"
  },
  secretary_view: {
    todays_schedule: "AGENDA DE HOY",
    no_events: "Sin eventos hoy ✨",
    coming_up: "PRÓXIMAMENTE",
    quick_notes: "NOTAS RÁPIDAS",
    add_note: "Agregar nota...",
    todo: "TAREAS",
    add_task: "Agregar tarea...",
    all_clear: "Todo listo 🎯"
  },
  friends_view: {
    find_friends: "BUSCAR AMIGOS",
    search_placeholder: "@usuario",
    friends_count: "AMIGOS ({{count}})",
    not_found: "{{tag}} no encontrado",
    add: "AGREGAR",
    search_hint: "Busca por @usuario para agregar amigos",
    select_friend: "Selecciona un amigo para chatear",
    no_messages: "Sin mensajes aún. ¡Saluda! 👋",
    message: "Mensaje...",
    call: "📹 LLAMAR",
    room: "Sala:"
  },
  footer: {
    free: "GRATIS · CUENTAS VERIFICADAS · SEGURIDAD DE EXTREMO A EXTREMO"
  }
};

const zh = {
  welcome_to: "欢迎来到",
  tagline: "你的数字宇宙。集中管理。",
  enter: "进入 NEXUS",
  features: {
    launcher: "应用启动器",
    calendar: "日历",
    secretary: "秘书",
    friends: "好友与私信",
    video: "视频通话",
    theme: "深色与浅色"
  },
  auth: {
    signup: "注册",
    signin: "登录",
    username: "用户名",
    email: "邮箱",
    password: "密码",
    send_verification: "发送验证",
    enter_nexus: "进入 NEXUS",
    verify_email: "验证邮箱",
    code_sent: "验证码已发送至",
    demo_code: "演示代码",
    enter_code: "输入6位数验证码",
    verify_enter: "验证并进入",
    back: "← 返回",
    all_required: "所有字段必填。",
    username_min: "用户名至少3个字符。",
    username_taken: "用户名已被使用。请换一个。",
    wrong_code: "验证码错误。提示：",
    fill_fields: "请填写所有字段。"
  },
  onboard: {
    step_of: "第 {{step}} 步，共 {{total}} 步",
    title: "构建你的宇宙",
    selected: "{{count}}/{{total}} 已选择",
    select_all: "全选",
    deselect_all: "取消全选",
    next: "下一步：{{label}} →",
    launch: "🚀 启动 NEXUS →"
  },
  dashboard: {
    apps: "应用",
    calendar: "日历",
    secretary: "秘书",
    friends: "好友",
    good: "",
    morning: "早上好",
    afternoon: "下午好",
    evening: "晚上好",
    focus_mode: "◆ 专注模式 — 仅工作",
    muted: "🔇 所有启动已静音",
    voice_commands: "语音命令",
    add: "+ 添加",
    add_app: "添加应用",
    to_category: "到 {{category}}",
    app_name: "应用名称",
    app_url: "https://example.com",
    add_app_btn: "添加应用",
    out: "退出"
  },
  calendar_view: {
    import_ics: "导入 .ICS",
    upcoming: "即将到来",
    no_upcoming: "没有即将到来的事件",
    add_event: "添加事件",
    event_title: "事件标题",
    time: "时间（如 14:30）",
    notes_optional: "备注（可选）",
    color: "颜色：",
    add_event_btn: "添加事件",
    click_hint: "点击事件删除 · 点击日期添加"
  },
  secretary_view: {
    todays_schedule: "今日日程",
    no_events: "今天没有事件 ✨",
    coming_up: "即将到来",
    quick_notes: "快速笔记",
    add_note: "添加笔记...",
    todo: "待办事项",
    add_task: "添加任务...",
    all_clear: "全部完成 🎯"
  },
  friends_view: {
    find_friends: "查找好友",
    search_placeholder: "@用户名",
    friends_count: "好友 ({{count}})",
    not_found: "{{tag}} 未找到",
    add: "添加",
    search_hint: "通过@用户名搜索添加好友",
    select_friend: "选择好友开始聊天",
    no_messages: "暂无消息。打个招呼！👋",
    message: "消息...",
    call: "📹 通话",
    room: "房间："
  },
  footer: {
    free: "免费 · 已验证账户 · 端到端加密"
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      zh: { translation: zh }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
