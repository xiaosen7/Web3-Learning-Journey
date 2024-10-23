# 比特币中的密码学原理笔记

[课程链接](https://www.bilibili.com/video/BV1Vt411X7JF?spm_id_from=333.788.videopod.episodes&vd_source=74bce47dc91fea0f83d6bc4f3e792e47&p=2)

## 哈希函数的重要性质

1. **碰撞抵抗性 (Collision Resistance)**

   - 难以找到两个不同输入产生相同哈希值
   - 用途: 检测数据篡改, 生成消息摘要

2. **隐藏性 (Hiding)**

   - 哈希计算过程单向不可逆
   - 哈希值不泄露输入信息
   - 用途: 实现数字承诺 (digital commitment)

3. **难题友好性 (Puzzle Friendly)**
   - 哈希函数的计算结果是不可预测的，要找到特定条件的哈希值只能通过大量尝试，没有捷径可走
   - 用途: 比特币挖矿过程

## 比特币中的账户管理

- 去中心化: 用户自行创建公钥和私钥对
- 公钥相当于账号, 私钥相当于密码
- 使用非对称加密体系

## 签名机制

- 交易时用私钥签名, 他人用公钥验证
- 确保交易真实性和不可否认性

## 重要注意事项

- 生成密钥对和签名时需要良好的随机源
- 通常先对消息哈希, 再对哈希值签名

## 重要英语术语

1. Cryptographic hash function 加密哈希函数
2. Collision resistance 碰撞抵抗性
3. Hiding 隐藏性
4. Puzzle friendly 难题友好性
5. Digital commitment 数字承诺
6. Sealed envelope 密封信封
7. Nonce 随机数
8. Block header 区块头
9. SHA256 (Secure Hash Algorithm) 安全哈希算法
10. Asymmetric encryption 非对称加密
11. Public key / Private key 公钥 / 私钥
12. Digital signature 数字签名
13. Brute force attack 暴力攻击
14. Good source of randomness 良好的随机源

## 补充知识: 鸽巢原理(也叫抽屉原理 Drawer Principle)

- 基本概念: 如果有 n 个物品放入 m 个容器中, 且 n > m, 则至少有一个容器会包含多于一个物品
- 在哈希函数中的应用:
  - 输入空间通常远大于输出空间
  - 必然存在不同输入产生相同哈希值 (碰撞)
- 重要性:
  - 说明了哈希碰撞的不可避免性
  - 解释了为什么完全避免碰撞是不可能的, 只能追求碰撞难以人为制造
- 在密码学中的意义:
  - 帮助理解哈希函数的设计目标
  - 强调了大输入空间对哈希函数安全性的重要性

## 比特币挖矿过程

- 目标: 找到一个使区块头哈希值小于等于特定目标值的 nonce
- 特点:
  - 没有捷径, 只能通过不断尝试
  - 可作为工作量证明
  - 挖矿难, 验证易
