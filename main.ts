import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TAbstractFile, TFile, Vault } from 'obsidian';

export default class ObsidianAutoCRLFPlugin extends Plugin {

	async autoReplaceLFToCRLF(vault: Vault, file: TFile): Promise<string> {
		return vault.process(file, (data) =>  data.replace(/((?<!\r)\n|\r(?!\n))/g, "\r\n"))
	}

	async onload() {
		this.app.vault.on('modify', (file) => {
			if (file instanceof TFile){
				this.autoReplaceLFToCRLF(this.app.vault, file as TFile)
			}
		});
	}
}


