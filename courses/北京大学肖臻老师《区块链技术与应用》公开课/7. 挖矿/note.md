# 挖矿

## 00:00 ~ 06:18 比特币工作原理及挖矿趋势总结

总结了比特币网络中全节点和轻节点的不同角色与功能，全节点负责维护完整区块链信息，验证交易合法性，而轻节点主要验证交易相关性与挖矿难度，不具备验证交易完整合法性的能力。同时，讨论了比特币挖矿中的趋势，强调了沿最长合法链挖矿的重要性，以及轻节点在比特币网络中的作用与局限。

### 内容详解

在 00:07，发言人首先总结了比特币网络中全节点和轻节点的不同角色与功能。全节点负责维护完整的区块链信息，在本地硬盘上保存完整的区块链数据，并在内存中维护 UTXO 集合（未花费交易输出集合），以便快速验证交易的合法性（00:07 - 01:29）。全节点还要监听比特币网络上的交易信息，验证每个交易的合法性，包括检查签名和防止双重支付（01:29 - 02:18）。全节点还要决定哪些交易会被打包到区块里，并验证其他矿工挖出的区块的合法性（02:18 - 03:01）。

轻节点（SPV 节点）则不保存整个区块链的信息，只保存每个区块的头部信息，从而节省大量存储空间（03:01 - 03:44）。轻节点只保存与自己相关的交易，无法验证大多数交易的合法性，但可以验证挖矿的难度（03:44 - 04:11）。轻节点假设全节点不会发布非法交易，因为发布非法交易对全节点没有好处（04:11 - 05:05）。轻节点只能检测哪个是最长链，无法检测哪个是最长合法链（05:05 - 05:31）。

在 05:31，发言人提到，假设矿工是理智的，不会沿着不合法的链挖下去，因为挖出一个区块的代价很大，需要做大量的工作才能挖出一个区块。如果挖出的区块被发现包含非法交易，那就白挖了（05:31 - 06:21）。因此，比特币网络中大部分节点都是轻节点。如果用户只是想进行转账，不需要挖矿，那么运行一个轻节点就足够了（06:21 - 06:18）。

总之，比特币网络中全节点和轻节点各自承担不同的职责，全节点负责维护完整的区块链信息和验证交易的合法性，而轻节点主要验证与自己相关的交易和挖矿难度。比特币挖矿中的趋势是沿着最长合法链挖矿，轻节点在比特币网络中起到了重要作用，但也有其局限性。

## 06:19 ~ 12:07 挖矿过程中遇到合法新区块的处理策略

当挖矿过程中监听到合法的新区块且其位于最长合法链上时，应当停止当前挖矿活动，重新组织区块。这是因新发布的区块可能包含原候选区块中的交易，或改变区块头的哈希值及指针。尽管这可能看似可惜，但挖矿的无记忆性保证了继续挖矿或重新开始对结果的影响相同。安全性主要通过密码学保证交易的合法性和共识机制维护网络的一致性来实现。挖矿设备的选择和优化也是挖矿成功的关键因素之一。

### 内容详解

在 06:21，发言人提到，在挖矿过程中，如果监听到别人发布的一个合法区块，并且该区块位于最长合法链上，这时应该停止已有的挖矿，重新组织，在本地组装一个候选区块，然后重新进行挖矿（06:21 - 07:32）。这是因为沿着新发布的区块往下挖，本地组装的区块中包含的交易会发生变化，有些交易可能已经被包含到新发布的区块中（07:32 - 08:12）。另外，区块头的信息也会变化，如交易组成的 Merkle 树根哈希值和指向前一个区块的指针等（08:12 - 08:27）。

尽管这样做看似可惜，因为已经挖了很长时间，但实际上并不可惜。挖矿的一个性质是无记忆性（memoryless），也可以叫 progress free（08:27 - 08:56）。无论是继续挖原来的区块，还是停下来改成挖一个新组装的区块，成功的概率是一样的（08:56 - 09:55）。只要当前还没有挖到符合要求的 nonce 值，前面已经挖了多长时间，对最后的结果没有影响（09:55 - 11:07）。

即使挖到了合法的区块并发布出去，也不一定就胜利了。发布的区块最终可能没有成为最长合法链的一部分，可能存在一些竞争条件，或者存在一些你不知道的双重支付，使得区块中某些交易最后变成有冲突的（11:07 - 11:55）。比特币的安全性是通过密码学上的保证和共识机制来实现的（11:55 - 12:07）。密码学保证了交易的合法性，而共识机制维护了网络的一致性。

总之，在挖矿过程中遇到合法新区块时，应当停止当前挖矿活动，重新组织区块。挖矿的无记忆性保证了继续挖矿或重新开始对结果的影响相同。比特币的安全性主要通过密码学和共识机制来实现，挖矿设备的选择和优化也是挖矿成功的关键因素之一。

## 12:07 ~ 21:10 挖矿设备演进：从 CPU 到 GPU 再到 ASIC

早期挖矿主要依靠 CPU，但由于其效率低下，逐渐转向 GPU 以提升性能。然而，随着比特币挖矿难度增加和 GPU 价格飙升，其用于挖矿的性价比降低。ASIC（专用集成电路）芯片因其专为挖矿设计，能效比高，成为主流。ASIC 矿机的研发周期长，比特币价格波动可能影响其投资回报，同时引发市场竞争加剧。矿工们需关注市场动态，及时调整设备以保持竞争力。

### 内容详解

在 12:07，发言人提到，挖矿设备的演化趋势是越来越专业化。最早大家用普通的 CPU 挖矿，像家里的计算机、笔记本电脑都可以用来挖矿（12:07 - 12:37）。但是如果你买一台计算机专门用来挖矿，其实是非常不划算的。计算机中的大部分内存都是闲置的，挖矿只用到很少一部分内存。CPU 中的大部分部件也是闲置的，因为挖矿中计算哈希值的操作只用到通用 CPU 中的很少一部分指令，硬盘和其他很多资源也都是闲置的（12:37 - 13:13）。所以随着比特币挖矿难度的提高，用 CPU 挖矿，用通用计算机挖矿，很快就变得无利可图了（13:13 - 13:33）。

因为性价比太低，所以挖矿设备就转入第二代设备——GPU。第一代是 CPU，第二代是 GPU（13:33 - 13:43）。GPU 挖矿比 CPU 挖矿的效率提高了很多。大家知道，GPU 主要用于大规模的并行计算。像深度学习中用 GPU 就用得很多，它有大量的矩阵乘法（13:43 - 14:00）。但是 GPU 用来挖矿其实还是有点浪费。为什么？因为 GPU 是为了通用并行计算而设计的，用来挖矿的话，里面有很多部件仍然是闲置状态。比如用于浮点数运算的部件，这些部件对于深度学习来说很重要，计算梯度需要用到浮点数运算。但是比特币的挖矿只用到整数操作，所以 GPU 挖矿比 CPU 效率有很大提高，但仍然有不少浪费（14:00 - 14:40）。

顺便说一下，最近几年 GPU 的价格涨得很快。有些人把它归因于深度学习的火热。其实有很多 GPU 是用来挖矿的（14:40 - 14:50）。不过有一个好消息，现在比特币挖矿难度的提升，用 GPU 挖矿已经不划算了。它已经超过了 GPU 的算力范围。所以现在没有那么多人因为挖矿而竞争购买 GPU 了，可以把这些 GPU 留给深度学习和打游戏等应用（14:50 - 15:27）。

有一些新开发的加密货币还用 GPU 挖矿。那么现在一般用什么挖矿呢？用 ASIC 芯片（15:27 - 15:43）。大家知道 ASIC 是什么意思吧？这是专门为了挖矿而设计的芯片，上面没有多余的电路逻辑，整个芯片就是为了比特币挖矿计算哈希值的操作而设计的，所以它的性价比是最高的（15:43 - 16:12）。这个芯片也干不了别的，除了挖矿之外，别的什么事都干不了。而且为某一种加密货币设计的 ASIC 芯片，只能挖这种加密货币，挖别的就不行，除非这两个加密货币用同一个挖矿难题（16:12 - 17:02）。

挖矿时求解的难题叫 mining puzzle。有些加密货币在新发行时，为了解决冷启动问题，故意用一个已有的加密货币的 mining puzzle。比如说跟比特币一样的 mining puzzle，这样可以吸引更多的人来挖矿，这种情况叫做 merged mining（17:02 - 17:33）。除了这种情况外，其他的都是一个芯片只能为一个加密货币挖矿。ASIC 芯片的研发周期很长，一款芯片从设计、流片到最后生产出来需要很长时间。像比特币的 ASIC 芯片可能需要一年的时间，而这已经算是非常快的了（17:33 - 18:22）。与通用芯片相比，这样的研发速度基本上可以说是创造了芯片史上的奇迹。在这么长的周期内，如果比特币价格出现剧烈变化，前期投入的研发费用可能就打水漂了（18:22 - 18:42）。

## 21:10 ~ 25:44 挖矿设备演进与去中心化理念的冲突

挖矿设备从通用 CPU 到 GPU，再到 ASIC，越来越专业，导致了对通用计算机挖矿能力的下降。虽然 ASIC 提高了挖矿效率，但降低了普通用户参与的可能性，违背了比特币的去中心化初衷。新型加密货币通过设计不同的挖矿机制，如抗 ASIC 的挖矿难题，旨在保持挖矿的民主性，让通用计算机也能参与挖矿。同时，大型矿池的出现使得单个矿工即使使用先进的挖矿设备，也难以稳定获得收益，进一步集中了挖矿资源。

### 内容详解

在 21:12，发言人提到，挖矿设备的演化趋势是从通用变得越来越专用。最早大家用 CPU 挖矿，用普通家里的计算机挖矿（21:12 - 22:02）。但是随着挖矿难度的增加，CPU 挖矿变得越来越不划算，逐渐被 GPU 挖矿取代（22:02 - 22:37）。GPU 挖矿虽然效率比 CPU 高，但仍然存在浪费，因为 GPU 是为通用并行计算设计的，挖矿时有很多部件是闲置的（22:37 - 23:10）。

为了提高挖矿效率，ASIC 芯片应运而生。ASIC 是专门为挖矿设计的芯片，能效比高，成为主流（23:10 - 23:53）。然而，ASIC 芯片除了挖矿外，别的也干不了，一旦过时就作废了（23:53 - 24:46）。这种情况与比特币去中心化的初衷相违背，因为普通用户无法参与挖矿（24:46 - 25:06）。

有些新的加密货币设计了抗 ASIC 的挖矿难题，目的是让通用计算机也能参与挖矿，保持挖矿的民主性（25:06 - 25:44）。同时，大型矿池的出现使得单个矿工即使使用先进的挖矿设备，也难以稳定获得收益，进一步集中了挖矿资源（25:44）。

总之，挖矿设备从 CPU 到 GPU 再到 ASIC，越来越专业，导致了对通用计算机挖矿能力的下降。虽然 ASIC 提高了挖矿效率，但降低了普通用户参与的可能性，违背了比特币的去中心化初衷。新型加密货币通过设计不同的挖矿机制，如抗 ASIC 的挖矿难题，旨在保持挖矿的民主性，让通用计算机也能参与挖矿。同时，大型矿池的出现使得单个矿工即使使用先进的挖矿设备，也难以稳定获得收益，进一步集中了挖矿资源。

## 25:44 ~ 38:13 矿池运作及矿工收入分配机制

矿池由矿主管理，负责收集交易组织区块，而矿工仅负责计算哈希值。矿工按贡献大小分配挖矿收益，机制需保证矿工努力的公正性。矿工间存在工作量证明，用于评估挖矿努力，而非仅仅依靠计算哈希值的速度。矿池内的收入分配方法需避免‘大锅饭’现象，保证矿工的积极性。矿工提交的算力能作为贡献的证明，当矿工挖到合法区块时，其收益将根据提交的算力比例进行分配。为防止矿工私下挖矿及提交新区块，矿池设计了任务分配及验证机制，确保矿工挖到的合法区块能被有效识别和奖励。此外，矿池的竞争和联盟现象也影响着矿工的收益分配及矿池的长期发展。

### 内容详解

在 25:44，发言人提到，矿池由矿主管理，负责收集交易并组织区块，而矿工仅负责计算哈希值（25:44 - 26:12）。矿工按贡献大小分配挖矿收益，机制需保证矿工努力的公正性（26:12 - 26:43）。矿工间存在工作量证明，用于评估挖矿努力，而非仅仅依靠计算哈希值的速度（26:43 - 27:02）。矿池内的收入分配方法需避免‘大锅饭’现象，保证矿工的积极性（27:02 - 27:33）。矿工提交的算力能作为贡献的证明，当矿工挖到合法区块时，其收益将根据提交的算力比例进行分配（27:33 - 28:12）。

为防止矿工私下挖矿及提交新区块，矿池设计了任务分配及验证机制，确保矿工挖到的合法区块能被有效识别和奖励（28:12 - 28:43）。此外，矿池的竞争和联盟现象也影响着矿工的收益分配及矿池的长期发展（28:43 - 29:12）。

在 29:12，发言人提到，矿池的管理费和恶意矿池的问题。一般来说，矿池的矿主会收取一定比例的出块奖励作为管理费（29:12 - 29:43）。有些恶意矿池可能会故意降低管理费，甚至赔本赚吆喝，以吸引更多矿工加入，从而发动攻击（29:43 - 30:12）。这种策略使得 51%攻击更加容易实现（30:12 - 30:43）。

在 30:43，发言人提到，矿池的集中度对比特币网络安全的影响。根据统计数据，中国的矿池占到了全球 81%的算力，远远超过其他国家（30:43 - 31:12）。这种集中化的现象使得比特币网络面临更大的 51%攻击风险（31:12 - 31:43）。虽然目前没有哪个矿池占到一半以上的算力，但这种集中化趋势仍然令人担忧（31:43 - 32:12）。

在 32:12，发言人提到，假设某个机构拥有半数以上的算力，它可以将这些算力分散隐藏在多个矿池中，平时分散隐藏，真正需要发动攻击时再集中起来（32:12 - 32:43）。矿工转换矿池非常容易，只需按照新的矿池协议与矿主联系即可（32:43 - 33:12）。这种灵活性使得 51%攻击变得更加容易（33:12 - 33:43）。

在 33:43，发言人提到，51%攻击中最常见的是分叉攻击。例如，攻击者可以在某个大额转账交易后发动分叉攻击，将钱转回自己账户（33:43 - 34:12）。由于攻击者拥有 51%的算力，其分叉链的增长速度会超过原链，最终成为最长合法链，从而回滚原交易（34:12 - 34:43）。矿工们通常不知道自己参与了分叉攻击，因为他们只负责计算哈希值，不了解具体交易内容（34:43 - 35:12）。

在 35:12，发言人提到，矿池的竞争和联盟现象也影响着矿工的收益分配及矿池的长期发展（35:12 - 35:43）。矿池之间的竞争可能导致矿工频繁转换矿池，以追求更高的收益（35:43 - 36:12）。这种现象可能导致矿池的算力波动，影响比特币网络的稳定性（36:12 - 36:43）。

在 36:43，发言人提到，矿池的联盟现象。矿池之间可能会形成联盟，共同对抗其他矿池，以获取更多的算力和收益（36:43 - 37:12）。这种联盟现象可能进一步加剧比特币网络的集中化，增加 51%攻击的风险（37:12 - 37:43）。

总之，矿池的运作及矿工收入分配机制对比特币网络的安全性和稳定性有着重要影响。矿池的集中化和联盟现象可能增加 51%攻击的风险，而矿池的竞争则可能导致算力波动，影响网络的稳定性（37:43 - 38:13）。

## 38:13 ~ 44:46 矿池集中度与比特币 51%攻击风险

讨论了矿池集中度对比特币网络安全的影响，特别是当某个矿池占有大量算力时，可能引发的 51%攻击风险。51%攻击允许攻击者通过控制超过半数的网络算力来发起分叉攻击，篡改交易记录，对区块链的安全性和稳定性构成威胁。此外，通过分散隐藏算力和临时集中，攻击者可以在不引起注意的情况下发动攻击。

### 内容详解

在 38:13，发言人提到，矿池的集中度对比特币网络安全的影响，特别是当某个矿池占有大量算力时，可能引发的 51%攻击风险（38:13 - 38:43）。51%攻击允许攻击者通过控制超过半数的网络算力来发起分叉攻击，篡改交易记录，对区块链的安全性和稳定性构成威胁（38:43 - 39:12）。此外，通过分散隐藏算力和临时集中，攻击者可以在不引起注意的情况下发动攻击（39:12 - 39:43）。

在 39:43，发言人提到，矿工转换矿池非常容易，只需按照新的矿池协议与矿主联系即可（39:43 - 40:12）。这种灵活性使得 51%攻击变得更加容易（40:12 - 40:43）。矿工们通常不知道自己参与了分叉攻击，因为他们只负责计算哈希值，不了解具体交易内容（40:43 - 41:12）。

在 41:12，发言人提到，51%攻击中最常见的是分叉攻击。例如，攻击者可以在某个大额转账交易后发动分叉攻击，将钱转回自己账户（41:12 - 41:43）。由于攻击者拥有 51%的算力，其分叉链的增长速度会超过原链，最终成为最长合法链，从而回滚原交易（41:43 - 42:12）。

在 42:12，发言人提到，矿池的竞争和联盟现象也影响着矿工的收益分配及矿池的长期发展（42:12 - 42:43）。矿池之间的竞争可能导致矿工频繁转换矿池，以追求更高的收益（42:43 - 43:12）。这种现象可能导致矿池的算力波动，影响比特币网络的稳定性（43:12 - 43:43）。

在 43:43，发言人提到，矿池的联盟现象。矿池之间可能会形成联盟，共同对抗其他矿池，以获取更多的算力和收益（43:43 - 44:12）。这种联盟现象可能进一步加剧比特币网络的集中化，增加 51%攻击的风险（44:12 - 44:43）。

总之，矿池的集中度对比特币网络安全的影响是显著的。矿池的集中化和联盟现象可能增加 51%攻击的风险，而矿池的竞争则可能导致算力波动，影响网络的稳定性（44:43 - 44:46）。

##### 44:46 ～ 结束 区块链分叉攻击及其后果

讨论了在区块链技术中，攻击者如何利用分叉攻击来阻止特定交易，特别是当攻击者拥有超过 50%的网络算力时，可以轻易地分叉链以阻止合法交易的确认。这种攻击方式不仅影响交易的确认，还可能导致矿工放弃继续在受影响的区块上工作，进而影响区块链网络的稳定性和安全性。同时，提到了挖矿池的出现提高了矿工的挖矿效率和收入稳定性，但同时也增加了 51%攻击的风险。

### 内容详解

在 44:46，发言人提到区块链分叉攻击及其后果。分叉攻击是指攻击者通过控制超过半数的网络算力，创建一个新的分叉链，从而回滚原链上的交易（44:46 - 45:12）。这种攻击的主要目的是篡改交易记录，例如将已经转出的比特币重新转回自己的账户（45:12 - 45:43）。由于攻击者拥有 51%的算力，其分叉链的增长速度会超过原链，最终成为最长合法链，从而使原链上的交易无效（45:43 - 46:12）。

在 46:12，发言人提到，分叉攻击不仅会导致交易回滚，还会对比特币网络的稳定性和安全性构成严重威胁（46:12 - 46:43）。这种攻击会破坏用户对比特币网络的信任，导致比特币价格下跌（46:43 - 47:12）。此外，分叉攻击还可能引发连锁反应，导致更多的矿工和用户退出比特币网络，进一步加剧网络的不稳定性（47:12 - 47:43）。

在 47:43，发言人提到，为了防止分叉攻击，比特币网络需要保持去中心化，避免算力过于集中在少数矿池手中（47:43 - 48:12）。矿工们应尽量分散算力，加入不同的矿池，以降低单个矿池发动 51%攻击的风险（48:12 - 48:43）。此外，比特币协议的改进和共识机制的优化也有助于提高网络的抗攻击能力（48:43 - 49:12）。

在 49:12，发言人提到，尽管分叉攻击的风险存在，但比特币网络在过去十多年中一直保持了较高的安全性和稳定性（49:12 - 49:43）。这主要得益于比特币网络的去中心化设计和全球矿工的共同努力（49:43 - 50:12）。未来，比特币网络需要继续保持去中心化，并不断优化协议和共识机制，以应对潜在的安全威胁（50:12 - 50:46）。

总之，区块链分叉攻击及其后果对比特币网络的安全性和稳定性构成了严重威胁。为了防止这种攻击，比特币网络需要保持去中心化，避免算力过于集中在少数矿池手中，并不断优化协议和共识机制（50:46 - 结束）。
