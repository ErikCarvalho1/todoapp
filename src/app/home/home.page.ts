import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tarefas: any[]=[]; // array tarefasa (nome, feito(verdadeiro/false))

  constructor(private alertCtrl: AlertController, 
    private toast: ToastController,
     private actionSheetCtrl: ActionSheetController
    ) {
  let tarefasJson = localStorage.getItem('tarefaDb');
  if(tarefasJson != null){
    this.tarefas = JSON.parse(tarefasJson);
  }
  // console.log(this.tarefas);
}
async addTarefa(){
  const alerta = await this.alertCtrl.create({
    header: 'O que você precisa fazer?', 
    inputs:[
      {name: 'txtnome', type:'text', placeholder:'digite aqui...'}
    ],
    buttons:[
      {text:'carcelar', role:'cancel', cssClass:'light',
        handler:()=>{
          console.log('Você cancelou?')
        }
      },
      {text:'ok',
        handler:(form)=>{
          this.add(form.txtnome)
        }
      }
    ]
  
  });

  alerta.present();
} 
async add(nova:any){
  if(nova.trim().length < 1){
    const toast = await this.toast.create({
      message: 'Informe o que você precisa fazer',
      duration: 2000,
      position: 'middle',
      color: 'warning'
    });
    toast.present();
  }else{
    let tarefa = { nome: nova, feito: false}
    this.tarefas.push(tarefa)
    this.atualizaLocalStorage();
    const toast = await this.toast.create({
      message: 'Tarefa adcionada com sucesso',
      duration: 1500,
      position: 'middle',
      color: 'success'
    });
    toast.present();
  }
}

atualizaLocalStorage(){
  localStorage.setItem('tarefaDb', JSON.stringify(this.tarefas))
}
async abrirOpcoes(tarefa:any){
  const actsheet = await this.actionSheetCtrl.create({header:'Escolha uma opção',
    buttons:[
      {
        text:tarefa.feito?'Desmarcar':'Marcar',
        icon:tarefa.feito?'radio-button-off':'checkmark-cicle',
        handler:()=>{
          tarefa.feito=!tarefa.feito;
          this.atualizaLocalStorage
        }
      }
    ]
  });
  actsheet.present()
}
}
