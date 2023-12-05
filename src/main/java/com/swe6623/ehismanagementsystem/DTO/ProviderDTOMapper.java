package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.Model.PolicyProvider;

import java.util.function.Function;

public class ProviderDTOMapper  implements Function<PolicyProvider,PolicyProviderDTO> {
    @Override
    public PolicyProviderDTO apply(PolicyProvider provider) {
        return new PolicyProviderDTO(
                provider.getProvider_id(),
                provider.getProvider_name(),
                provider.getProvider_address(),
                provider.getContact_person(),
                provider.getPhone_number(),
                provider.getEmail());
    }
}
