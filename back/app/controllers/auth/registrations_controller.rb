module Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    private
    def sign_up_params
      params.permit(:name, :email, :password, :password_confirmation, :undergraduate, :subject, :generation, :occupation)
    end
    def account_update_params
      params.permit(:name, :email, :undergraduate, :subject, :generation, :occupation)
    end
  end
end