import { BaseForm } from 'uniforms/es5';

function Ionic(parent: any): any {
  class _ extends parent {
    static Ionic = Ionic;

    static displayName = `Ionic${parent.displayName}`;
  }

  return _;
}

export default Ionic(BaseForm);