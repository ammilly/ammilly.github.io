---
layout: post
title: Win7 Git bash 出现Permission denied (publickey)错误
tags: shell git bash github permission
date: 2016-07-22 13:50:00 +800
---

> Windows用户的多数程序员喜欢安装Git bash，用命令行控制。最近发现如果要操作多个git repos，需要生成多个MD5密钥。在执行git操作时需要指定使用哪个密码，通过以下设置可以实现。

<!--more-->

### Check that you are connecting to the correct server

使用下面的命令检查是否连接到正确的domain：

```bash
$ ssh -vT ssh -vT git@github.com
OpenSSH_7.1p2, OpenSSL 1.0.2h  3 May 2016
debug1: Reading configuration data /c/Users/Amy Zhao/.ssh/config
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Connecting to github.com [192.30.253.112] port 22.
debug1: Connection established.
debug1: key_load_public: No such file or directory
debug1: identity file /c/Users/Amy Zhao/.ssh/id_rsa type -1
debug1: key_load_public: No such file or directory
...
```

### Always use the "git" user

All connections must be made as the "git" user. If you try to connect with your GitHub username, it will fail:

```bash
$ ssh -T billy.anyteen@github.com
Permission denied (publickey)
```

Instead, you should verify your connection by typing:

```bash
$ ssh -T git@github.com
Hi your_username! You've successfully authenticated, but GitHub does not provide shell access.
```

### Make sure you have a key that is being used

First, you should turn on ssh-agent:

```bash
# start the ssh-agent in the background
$ eval "$(ssh-agent -s)"
Agent pid 15192
```

Verify that you have a private key generated and loaded into SSH. If you're using OpenSSH 6.7 or older, typing:

```bash
$ ssh-add -l
2048 a0:dd:42:3c:5a:9d:e4:2a:21:52:4e:78:07:6e:c8:4d /Users/you/.ssh/id_rsa (RSA)
```

Or if you're using OpenSSH 6.8 or newer:

```bash
$ ssh-add -l -E md5
2048 MD5:a0:dd:42:3c:5a:9d:e4:2a:21:52:4e:78:07:6e:c8:4d /Users/you/.ssh/id_rsa (RSA)
```

The `ssh-add` command should print out a long string of numbers and letters. If it doesn't print anything, you'll need to [generate a new SSH key][generate SSH keys] and associate it the GitHub.

***Tip: On most systems the default private keys (~/.ssh/id_rsa, ~/.ssh/id_dsa and ~/.ssh/identity) are automatically added to the SSH authentication agent. You shouldn't need to run ssh-add path/to/key unless you override the file name when you generate a key.***


## Auto-launching ssh-agent on Git for Windows

If you want to auto-start ssh-agent and add the private key you wanted, you can config your `~/.bashrc` file like below:

```bash
env=~/.ssh/agent.env

agent_load_env () { test -f "$env" && . "$env" >| /dev/null ; }

agent_start () {
    (umask 077; ssh-agent >| "$env")
    . "$env" >| /dev/null ; }

agent_load_env

# agent_run_state: 0=agent running w/ key; 1=agent w/o key; 2= agent not running
agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo $?)

if [ ! "$SSH_AUTH_SOCK" ] || [ $agent_run_state = 2 ]; then
    agent_start
    ssh-add ~/.ssh/github-amy
    ssh-add ~/.ssh/github_rsa
elif [ "$SSH_AUTH_SOCK" ] && [ $agent_run_state = 1 ]; then
    ssh-add ~/.ssh/github-amy
    ssh-add ~/.ssh/github_rsa
fi

unset env
```

***Tip: If your private keys are not stored in ~/.ssh/id_rsa or ~/.ssh/id_dsa, you must add their paths with the ssh-add command so that your SSH authentication agent knows where to find them. For example: `ssh-add ~/.my_other_ssh/id_rsa` ***

Now, when you first run Git Bash, your ssh-agent and identities was started automatically.
The `ssh-agent` process will continue to run until you log out, shut down your computer or kill the process.

If you want `ssh-agent` to forget your key after some time, you can configure it to do so by running `ssh-add -t <seconds>`.

## 参考

#### GitHub Help
[Working with SSH key passphrases](https://help.github.com/articles/working-with-ssh-key-passphrases/)
[Error: Permission denied (publickey)](https://help.github.com/articles/error-permission-denied-publickey/)