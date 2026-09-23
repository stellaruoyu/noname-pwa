(() => {
	const prefix = "noname_0.9_";
	const language = localStorage.getItem(prefix + "learning_language") || "both";
	if (language === "zh") return;
	const translations = {
		选项: "Options", 暂停: "Pause", 托管: "Auto-play", "托管中...": "Auto-playing...", 整理手牌: "Arrange hand", 显示身份: "Show identity",
		先: "First", 后: "Second",
		翻面: "Flip", 选择武将: "Choose character", 起始武将: "Starting characters", 开始: "Start", 卡牌: "Cards",
		武将: "Characters", 扩展: "Extensions", 其它: "Other", 身份: "Identity", 国战: "National War", 对决: "Versus",
		联机: "Online", 挑战: "Challenge", 斗地主: "Landlord", 单挑: "1v1", 战棋: "Chess", 塔防: "Tower Defense",
		乱斗: "Brawl", 炉石: "Hearthstone", 游戏模式: "Game mode", 标准: "Standard", 游戏人数: "Players", 八人: "Eight players",
		双内奸: "Two spies", 更多: "More", 开: "On", 关: "Off", 关闭: "Off", 启用: "Enable", 禁用: "Disable",
		神武将选择势力: "Choose god general faction", 双将模式: "Double generals", 特殊身份: "Special identities", 明忠卡牌替换: "Loyalist card replacement",
		主内单挑特效: "Lord/spy 1v1 effects", 双将体力上限: "Double-general HP limit", 平均值: "Average", 自动显示身份: "Auto-show identity",
		自动标记身份: "Auto-mark identity", 加强主公: "Enhanced lord", 开启换将卡: "Enable replacement card", 开启手气卡: "Enable hand luck card",
		开启首轮强化卡牌: "Enable first-round cards", 内奸自动标记伪装反贼: "Auto-mark disguised spy", 显示再战: "Show rematch",
		死亡后显示重来: "Show restart after death", 死亡后显示复活: "Show revive after death", 屏蔽身份: "Hide identity", 屏蔽身份2: "Hide identity 2", 屏蔽身份3: "Hide identity 3",
		内奸策略: "Spy strategy", 均衡: "Balanced", AI对人态度: "AI attitude", 一般: "Normal", 启用平民: "Enable commoners", 按势力筛选: "Filter by faction",
		自由选将: "Free character choice", 自由选择身份和座位: "Free identity and seat choice", 确定: "Confirm", 取消: "Cancel",
		重来: "Restart", 退出: "Exit", 记录: "Log", 结束回合: "End turn", 摸牌: "Draw", 出牌: "Play", 弃牌: "Discard",
		摸牌阶段: "Draw phase", 出牌阶段: "Play phase", 弃牌阶段: "Discard phase", 结束阶段: "End phase", 选择目标: "Choose target",
		响应: "Respond", 发动技能: "Use skill", 牌堆: "Draw pile", 弃牌堆: "Discard pile", 手牌: "Hand", 体力: "HP",
		你的回合: "Your turn", 对手回合: "Opponent turn", 游戏结束: "Game over", 胜利: "Victory", 失败: "Defeat",
		魏: "Wei", 蜀: "Shu", 吴: "Wu", 群: "Qun",
	};
	const markedFragments = {
		寒冰剑: "Ice Sword",
		八卦阵: "Eight Trigrams",
		请选择一名出场武将: "Choose a character to play",
	};
	const translate = (node) => {
		const value = node.nodeValue.trim();
		const opponentChoice = /^对手选择了(.+)$/.exec(value);
		if (opponentChoice) {
			const names = { 孟获: "Meng Huo" };
			const englishName = names[opponentChoice[1]] || opponentChoice[1];
			const english = `Opponent chose ${englishName}`;
			node.nodeValue = node.nodeValue.replace(value, language === "en" ? english : `${english} · ${value}`);
			return;
		}
		for (const [chinese, english] of Object.entries(markedFragments)) {
			if (value.includes(chinese)) {
				const replacement = language === "en" ? english : `${english} · ${chinese}`;
				node.nodeValue = node.nodeValue.replaceAll(chinese, replacement);
				return;
			}
		}
		const english = translations[value];
		if (!english) return;
		node.nodeValue = node.nodeValue.replace(value, language === "en" ? english : `${english} · ${value}`);
	};
	const scan = (root) => {
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
		const nodes = [];
		while (walker.nextNode()) nodes.push(walker.currentNode);
		for (const node of nodes) {
			if (node.parentElement && !["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) translate(node);
		}
	};
	const observe = () => {
		if (!document.documentElement) return setTimeout(observe, 0);
		scan(document.documentElement);
		new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
			if (node.nodeType === Node.TEXT_NODE) translate(node);
			else if (node.nodeType === Node.ELEMENT_NODE) scan(node);
		}))).observe(document.documentElement, { childList: true, subtree: true });
		// The original engine also updates some controls through innerHTML and
		// canvas/layout refreshes, so periodically rescan those late-created nodes.
		setInterval(() => scan(document.documentElement), 250);
	};
	observe();
})();
